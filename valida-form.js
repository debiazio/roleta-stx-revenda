function validarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.replace(/\D/g, "");
  const comunicacoes = document.getElementById("comunicacoes").checked;
  const privacidade = document.getElementById("privacidade").checked;

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos obrigatórios.");
    return false;
  }

  if (!comunicacoes || !privacidade) {
    alert("Você deve aceitar os termos e autorizar as comunicações.");
    return false;
  }

  const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome);
  if (!nomeValido) {
    alert("O nome deve conter apenas letras.");
    return false;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    alert("Insira um e-mail válido.");
    return false;
  }

  if (telefone.length !== 11) {
    alert("O telefone deve ter 11 dígitos.");
    return false;
  }

  // Se tudo certo, troca para a tela2
  const tela1 = document.querySelector(".tela1");
  const tela2 = document.querySelector(".tela2");
  tela1.style.display = "none";
  tela2.style.display = "flex";

  return false;
}
