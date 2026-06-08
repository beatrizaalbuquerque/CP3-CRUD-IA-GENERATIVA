// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================

var filmes = [
  "Interstellar",
  "Parasita",
  "Whiplash"
];

var USUARIO_CORRETO = "aluno";
var SENHA_CORRETA = "fiap2025";

// ==========================================
// AUTENTICAÇÃO
// ==========================================

function fazerLogin() {
  var usuario = document.getElementById("usuario").value;
  var senha = document.getElementById("senha").value;
  var erroLogin = document.getElementById("erro-login");

  if (usuario === "" || senha === "") {
    erroLogin.textContent = "Preencha todos os campos.";
    erroLogin.classList.remove("escondido");
    return;
  }

  if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
    erroLogin.classList.add("escondido");
    document.getElementById("tela-login").classList.add("escondido");
    document.getElementById("tela-lista").classList.remove("escondido");
    renderizarLista();
  } else {
    erroLogin.textContent = "Usuário ou senha incorretos.";
    erroLogin.classList.remove("escondido");
  }
}

function fazerLogout() {
  document.getElementById("tela-lista").classList.add("escondido");
  document.getElementById("tela-login").classList.remove("escondido");
  document.getElementById("usuario").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("erro-login").classList.add("escondido");
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

function renderizarLista() {
  var ul = document.getElementById("lista-filmes");
  var contador = document.getElementById("contador");

  ul.innerHTML = "";
  contador.textContent = "(" + filmes.length + ")";

  for (var i = 0; i < filmes.length; i++) {
    var li = document.createElement("li");
    li.className = "item-filme";

    var numero = document.createElement("span");
    numero.className = "item-numero";
    numero.textContent = (i + 1) + ".";

    var texto = document.createElement("span");
    texto.className = "item-texto";
    texto.textContent = filmes[i];

    var botoes = document.createElement("div");
    botoes.className = "item-botoes";

    var btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-editar";
    btnEditar.setAttribute("data-index", i);
    btnEditar.onclick = function () {
      editarItem(parseInt(this.getAttribute("data-index")));
    };

    var btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";
    btnRemover.setAttribute("data-index", i);
    btnRemover.onclick = function () {
      removerItem(parseInt(this.getAttribute("data-index")));
    };

    botoes.appendChild(btnEditar);
    botoes.appendChild(btnRemover);

    li.appendChild(numero);
    li.appendChild(texto);
    li.appendChild(botoes);

    ul.appendChild(li);
  }
}

// ==========================================
// CRUD
// ==========================================

function adicionarNoFinal() {
  var input = document.getElementById("novo-item");
  var valor = input.value.trim();
  var erro = document.getElementById("erro-item");

  if (valor === "") {
    erro.classList.remove("escondido");
    return;
  }

  erro.classList.add("escondido");
  filmes.push(valor);
  input.value = "";
  renderizarLista();
}

function adicionarNoInicio() {
  var input = document.getElementById("novo-item");
  var valor = input.value.trim();
  var erro = document.getElementById("erro-item");

  if (valor === "") {
    erro.classList.remove("escondido");
    return;
  }

  erro.classList.add("escondido");
  filmes.unshift(valor);
  input.value = "";
  renderizarLista();
}

function editarItem(index) {
  var novoValor = prompt("Editar filme:", filmes[index]);

  if (novoValor === null || novoValor.trim() === "") {
    return;
  }

  filmes[index] = novoValor.trim();
  renderizarLista();
}

function removerItem(index) {
  filmes.splice(index, 1);
  renderizarLista();
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderizarLista();