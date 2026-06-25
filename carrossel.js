const trilho = document.getElementById('trilho');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

const totalImagens = trilho.children.length; 
let indexAtual = 0;

function moverCarrossel() {
  if (indexAtual >= totalImagens) {
    indexAtual = 0;
  }
  else if (indexAtual < 0) {
    indexAtual = totalImagens - 1;
  }

  const deslocamento = indexAtual * -100;
  trilho.style.transform = `translateX(${deslocamento}%)`;
}

btnProximo.addEventListener('click', () => {
  indexAtual++;
  moverCarrossel();
});

btnAnterior.addEventListener('click', () => {
  indexAtual--;
  moverCarrossel();
});
