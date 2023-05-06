let title = document.getElementById('title')
let erro = document.getElementById('erro')
let email = document.getElementById('email')
let divSenha = document.getElementById('divSenha')
let senha = document.getElementById('senha')
let btnRecSenha = document.getElementById('recuperar')
let btnLogin = document.getElementById('login')
let btnRegister = document.getElementById('register')
let infoSenha = document.getElementById('infoSenha')
let info = document.getElementById('info')


/// muda os elementos do modal para cadastro
function cadastrar(){
    title.innerHTML='Register'
    erro.style.display='none'
    btnLogin.style.display='none'
    btnRegister.style.display='block'
    infoSenha.style.display='none'
    info.innerHTML='Tem uma conta ? <span onclick="login()">Login</span>'
}

/// muda os elementos do modal para login
function login(){
    title.innerHTML='Login'
    erro.style.display='none'
    btnLogin.style.display='block'
    btnRegister.style.display='none'
    infoSenha.style.display='block'
    info.innerHTML='não tem uma conta? <span onclick="cadastrar()">Cadastrar</span> '
}

/// muda os elementos do modal para resetar senha
function recuperar(){
    title.innerHTML='Redefinir Senha'
    erro.style.display='none'
    //senha.style.display='none'
    /* senha.previousElementSibling.style.display='none' */
    divSenha.style.display='none'
    btnLogin.style.display='none'
    btnRecSenha.style.display='block'
    infoSenha.style.display='none'
    info.style.display='none'
}

/// resetar Modal para estado inicial
function resetModal(){
    console.log('Reset Modal')
    title.style.display='block'
    title.innerHTML = 'Login'
    erro.style.display='none'
    email.value=''
    divSenha.style.display='block'
    senha.value=''
    //senha.previousElementSibling.style.display = 'block' 
    btnRecSenha.style.display = 'none'
    btnLogin.style.display = 'block'
    btnRegister.style.display = 'none'
    infoSenha.style.display = 'block'
    info.style.display = 'block'
    info.innerHTML = 'não tem uma conta? <span onclick="cadastrar()">Cadastrar</span> '
}

/// mostra e oculta a senha
function visao(){
    let visao = document.getElementById('senhaVisible')
    if(visao.innerHTML == 'Mostrar'){
        visao.innerHTML='Ocultar'
        senha.type='text'
    }else{
        visao.innerHTML='Mostrar'
        senha.type='password'
    }
}

////////////////////////////////////////////////
/////////////////// Eventos ////////////////////
////////////////////////////////////////////////

const modal_2 = document.querySelector('.modal-container-2')

///// abri e fecha o modal
function modalLogin() {
  modal_2.classList.add('active')

  modal_2.onclick = e => {
    if (e.target.className.indexOf('modal-container-2') !== -1) {
      modal_2.classList.remove('active')
 
      resetModal()
    }
  }
}

/// envia os dados para a função de fazer login do firebase
document.getElementById('login').onclick = e =>{
    e.preventDefault()
    let email = document.getElementById('email').value.trim()
    let senha = document.getElementById('senha').value.trim()

    if(email=='' || senha ==''){
        title.style.display='none'
        erro.style.display='block'
        erro.innerHTML='Preencha todos os campos' 
        return
    }
    
    // adiciona a class enviando 
    btnLogin.classList.add('enviando')

    // chama a função
    loginFirebase(email, senha)  
} 

/// envia os dados para a função de fazer registro do firebase
document.getElementById('register').onclick = e => {
    e.preventDefault()
    let email = document.getElementById('email').value.trim()
    let senha = document.getElementById('senha').value.trim()

    if(email=='' || senha ==''){
        title.style.display='none'
        erro.style.display='block'
        erro.innerHTML='Preencha todos os campos' 
        return
    }
    
    // adiciona a class enviando 
    btnRegister.classList.add('enviando')
    
    // chama a função
    registerFirebase(email, senha)
}

/// envia o email para a função de reset de senha no firebase
document.getElementById('recuperar').onclick = e => {
    e.preventDefault()
    let email = document.getElementById('email').value.trim()

    if(email==''){
        title.style.display='none'
        erro.style.display='block'
        erro.innerHTML='Digite o email' 
        return
    }
    
    // adiciona a class enviando 
    btnRecSenha.classList.add('enviando')
    
    // chama a função
     resetEmail(email) 
} 


