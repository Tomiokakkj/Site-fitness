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
    btnCarrinho.style.display = "none"; // Esconde o botão
});
fecharCarrinho.addEventListener('click', () => {
    carrinhoAba.classList.add('fechar');
    btnCarrinho.style.display = "block"; // Mostra o botão novamente
});

// Adicionar produto ao carrinho
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const nome = e.target.getAttribute('data-nome');
        const preco = parseFloat(e.target.getAttribute('data-preco'));

        // Verifica se o item já existe no carrinho
        const itemExistente = carrinho.find(item => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ nome, preco, quantidade: 1 });
        }

        // Abre o carrinho automaticamente ao adicionar um item (melhora a experiência)
        carrinhoAba.classList.remove('fechar');
        btnCarrinho.style.display = "none";

        atualizarCarrinho();
    });
});

// Funções para alterar quantidades dentro do carrinho
function alterarQuantidade(nome, mudança) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade += mudança;
        // Se a quantidade chegar a 0 ou menos, remove o produto
        if (item.quantidade <= 0) {
            removerDoCarrinho(nome);
            return;
        }
    }
    atualizarCarrinho();
}

function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
    itensCarrinhoContainer.innerHTML = '';
    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        totalItens += item.quantidade;

        const divItem = document.createElement('div');
        divItem.classList.add('item-no-carrinho');
        
        // Estrutura atualizada com botões de controle de quantidade e lixeira
        divItem.innerHTML = `
            <div style="flex-grow: 1; margin-right: 10px;">
                <h4 style="margin: 0; font-size: 14px; color: #333;">${item.nome}</h4>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                    <button class="btn-qtd" onclick="alterarQuantidade('${item.nome}', -1)" style="padding: 2px 6px; cursor: pointer; border: 1px solid #ccc; background: #eee; font-weight: bold;">-</button>
                    <span style="font-size: 14px;">${item.quantidade}</span>
                    <button class="btn-qtd" onclick="alterarQuantidade('${item.nome}', 1)" style="padding: 2px 6px; cursor: pointer; border: 1px solid #ccc; background: #eee; font-weight: bold;">+</button>
                    <button onclick="removerDoCarrinho('${item.nome}')" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 12px; margin-left: 10px;">🗑️ Remover</button>
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

    // Salva o estado atual do carrinho no navegador
    localStorage.setItem('carrinho_corefit', JSON.stringify(carrinho));
}

// Vincula as funções ao objeto global window para que os atributos inline 'onclick' funcionem corretamente
window.alterarQuantidade = alterarQuantidade;
window.removerDoCarrinho = removerDoCarrinho;


btnFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    window.location.href = "Compra.html";
});
