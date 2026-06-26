// Seleção de elementos do DOM
const btnCarrinho = document.getElementById('btn-carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const carrinhoAba = document.getElementById('carrinho-aba');
const botoesAdicionar = document.querySelectorAll('.add-to-cart');
const itensCarrinhoContainer = document.getElementById('itens-carrinho');
const totalCarrinhoElemento = document.getElementById('total-carrinho');
const contadorCarrinhoElemento = document.getElementById('contador-carrinho');
const btnFinalizar = document.getElementById('finalizar-compra');

// Recupera o carrinho do localStorage ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho_corefit')) || [];

// Renderiza o carrinho ao carregar a página (caso tenha itens salvos)
document.addEventListener('DOMContentLoaded', atualizarCarrinho);

// Abrir e fechar a aba do carrinho
btnCarrinho.addEventListener('click', () => {
    carrinhoAba.classList.remove('fechar');
    btnCarrinho.style.display = "none";
});
fecharCarrinho.addEventListener('click', () => {
    carrinhoAba.classList.add('fechar');
    btnCarrinho.style.display = "block";
});

// Adicionar produto ao carrinho (Garante APENAS UM plano selecionado por vez)
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const nome = e.target.getAttribute('data-nome');
        const preco = parseFloat(e.target.getAttribute('data-preco'));

        // Limpa o carrinho antes de adicionar para não acumular múltiplos planos
        carrinho = []; 
        
        // Insere o novo plano com quantidade fixa em 1
        carrinho.push({ nome, preco, quantidade: 1 });

        // Abre a aba do carrinho na tela automaticamente
        carrinhoAba.classList.remove('fechar');
        btnCarrinho.style.display = "none";

        atualizarCarrinho();
    });
});

// Função para remover o plano do carrinho
function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

// Atualizar interface do carrinho (Sem os botões de quantidade que você circulou)
function atualizarCarrinho() {
    itensCarrinhoContainer.innerHTML = '';
    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        totalItens += item.quantidade;

        const divItem = document.createElement('div');
        divItem.classList.add('item-no-carrinho');
        
        // HTML limpo: exibe apenas o Nome, o botão Remover e o Preço
        divItem.innerHTML = `
            <div style="flex-grow: 1; margin-right: 10px;">
                <h4 style="margin: 0; font-size: 14px; color: #333;">${item.nome}</h4>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                    <button onclick="removerDoCarrinho('${item.nome}')" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 12px; padding: 0;">🗑️ Remover</button>
                </div>
            </div>
            <span style="font-weight: bold; color: #000; min-width: 75px; text-align: right;">
                R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
            </span>
        `;
        itensCarrinhoContainer.appendChild(divItem);
    });

    totalCarrinhoElemento.innerText = total.toFixed(2).replace('.', ',');
    contadorCarrinhoElemento.innerText = totalItens;

    // Atualiza o banco de dados temporário do navegador
    localStorage.setItem('carrinho_corefit', JSON.stringify(carrinho));
}

// Vincula a remoção ao escopo global para o botão funcionar perfeitamente
window.removerDoCarrinho = removerDoCarrinho;

// Validação final de compra
btnFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    window.location.href = "Compra.html";
});
