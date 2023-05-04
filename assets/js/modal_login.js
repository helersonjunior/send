let title = document.getElementById('title')
let erro = document.getElementById('erro')
let email = document.getElementById('email')
let senha = document.getElementById('senha')
let btnRecSenha = document.getElementById('recuperar')
let btnLogin = document.getElementById('login')
let btnRegister = document.getElementById('register')
let infoSenha = document.getElementById('infoSenha')
let info = document.getElementById('info')


function cadastrar(){
    title.innerHTML='Register'
    erro.style.display='none'
    btnLogin.style.display='none'
    btnRegister.style.display='block'
    infoSenha.style.display='none'
    info.innerHTML='Tem uma conta ? <span onclick="login()">Login</span>'
}

function login(){
    title.innerHTML='Login'
    erro.style.display='none'
    btnLogin.style.display='block'
    btnRegister.style.display='none'
    infoSenha.style.display='block'
    info.innerHTML='não tem uma conta? <span onclick="cadastrar()">Cadastrar</span> '
}

function recuperar(){
    title.innerHTML='Redefinir Senha'
    erro.style.display='none'
    senha.style.display='none'
    senha.previousElementSibling.style.display='none'
    btnLogin.style.display='none'
    btnRecSenha.style.display='block'
    infoSenha.style.display='none'
    info.style.display='none'
}

// resetar Modal
function resetModal(){
    console.log('Reset Modal')
    title.style.display='block'
    title.innerHTML = 'Login'
    erro.style.display='none'
    email.value=''
    senha.style.display = 'block'
    senha.value=''
    senha.previousElementSibling.style.display = 'block'
    btnRecSenha.style.display = 'none'
    btnLogin.style.display = 'block'
    btnRegister.style.display = 'none'
    infoSenha.style.display = 'block'
    info.style.display = 'block'
    info.innerHTML = 'não tem uma conta? <span onclick="cadastrar()">Cadastrar</span> '
}

/////////////////// Eventos //////////////////////////

const modal_2 = document.querySelector('.modal-container-2')

function modalLogin() {
  modal_2.classList.add('active')

  modal_2.onclick = e => {
    if (e.target.className.indexOf('modal-container-2') !== -1) {
      modal_2.classList.remove('active')
 
      resetModal()
    }
  }
}

document.getElementById('login').onclick = e =>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    //console.log("logar", {email, senha})
    btnLogin.classList.add('enviando')
    loginFirebase(email, senha) 
} 

document.getElementById('register').onclick = e => {
    e.preventDefault()
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    //console.log("register", {email, senha})
    registerFirebase(email, senha)
}

document.getElementById('recuperar').onclick = e => {
    e.preventDefault()
    let email = document.getElementById('email').value
    console.log("email para redefinir senha", {email})
    resetEmail(email) 
} 

/* document.querySelector('.form').addEventListener('submit', (e)=>{
    e.preventDefault()
})
 */