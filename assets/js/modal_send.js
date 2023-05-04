let carregamento = document.querySelector(".pre-carregamento")
let link = document.querySelector("#mudar")
let nome = document.querySelector(".label1")
let mensagem = document.querySelector(".label2")
let form1 = document.querySelector(".form1")
let form2 = document.querySelector(".form2")
let MensagemFlesh = document.querySelector('.MensagemFlesh')

link.onclick = () => {

  if (link.innerText == "Link") {
    nome.innerText = 'Nome do link'
    mensagem.innerText = "Endereço"
    link.innerHTML = "Arquivo"
  }
  else if (link.innerText == "Arquivo") {
    form1.style.display = "none"
    form2.style.display = "block"
    link.innerText = "Mensagem"
  }
  else if (link.innerHTML == "Mensagem") {
    form2.style.display = "none"
    form1.style.display = "block"
    nome.innerText = 'Nome'
    mensagem.innerText = "Mensagem"
    link.innerHTML = "Link"
  }
}


function avisoSucesso() {

  MensagemFlesh.classList.remove("apagado")
  MensagemFlesh.classList.remove("erro")
  MensagemFlesh.classList.add("sucesso")
  MensagemFlesh.innerText = "Enviado"
  MensagemFlesh.style.display = "flex"

  setTimeout(() => {
    MensagemFlesh.style.display = "none"
  }, 900)

}
function avisoErro() {

  MensagemFlesh.classList.remove("sucesso")
  MensagemFlesh.classList.remove("apagado")
  MensagemFlesh.classList.add("erro")
  MensagemFlesh.innerText = "Houve um erro"
  MensagemFlesh.style.display = "flex"

  setTimeout(() => {
    MensagemFlesh.style.display = "none"
  }, 900)

}

function avisoExcluido() {

  let mensagem = document.querySelector('.MensagemFlesh')
  MensagemFlesh.classList.remove("sucesso")
  MensagemFlesh.classList.remove("erro")
  MensagemFlesh.classList.add("apagado")
  MensagemFlesh.innerText = "Apagado"
  MensagemFlesh.style.display = "flex"

  setTimeout(() => {
    MensagemFlesh.style.display = "none"
  }, 900)
  
}

const modal = document.querySelector('.modal-container-1')
function openModal(index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container-1') !== -1) {
      modal.classList.remove('active')
    }
  }
}