
let padrao = document.querySelectorAll('.padrao')
let tema = document.querySelector('.temas')
let as = document.querySelectorAll('.a')


//---- mudar de tema e setar na local storage
tema.onclick = () => {
      
   padrao.forEach( p => {
        
    if(p.classList.contains('dia')){
        p.classList.remove('dia')
        p.classList.add('noite')

        localStorage.setItem('tema', 'noite')
    }else{
        p.classList.remove('noite')
        p.classList.add('dia')

        localStorage.setItem('tema', 'dia')
    }
   });
}

//----- adiciona tema
window.onload = function () {
    console.log('Tema', localStorage.getItem('tema'))
    padrao.forEach(p => {
        p.classList.add(localStorage.getItem('tema') || 'dia')
    })    
}