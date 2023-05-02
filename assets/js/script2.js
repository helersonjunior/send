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

function hora() {
  var data = new Date()
  var ano = data.getFullYear()
  var mes = data.getMonth() + 1
  var dia = data.getDate()

  var hora = data.getHours()
  var minutos = data.getMinutes()
  var segundos = data.getSeconds()

  let horaV = hora < 10 ? "0" + hora : hora
  let minutosV = minutos < 10 ? "0" + minutos : minutos
  //let segundosV = segundos < 10 ? "0" + segundos : segundos 

  let mesV = mes < 10 ? "0" + mes : mes
  let diaV = dia < 10 ? "0" + dia : dia


  let d = diaV + "/" + mesV + "/" + ano
  let h = horaV + ":" + minutosV

  console.log("data", h + " - " + d)
  return h + " - " + d
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
