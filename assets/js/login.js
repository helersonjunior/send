
function cadastrar(){
    document.getElementById('title').innerHTML='Register'
    document.getElementById('info').style.visibility='hidden'
    document.getElementById('login').style.display='none'
    document.getElementById('register').style.display='block'
}

document.getElementById('login').onclick = e =>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    console.log("logar", {email, senha})
} 

document.getElementById('register').onclick = e => {
    e.preventDefault()
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    console.log("register", {email, senha})
}