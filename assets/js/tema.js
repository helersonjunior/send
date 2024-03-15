
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


        as.forEach(a => {

            if(p.classList.contains('noite')){
                a.classList.remove('ancora-dia')
                a.classList.add('ancora-noite')
            }else{
                a.classList.remove('ancora-noite')
                a.classList.add('ancora-dia')
            }
            
        })
       

   });

   
   
}

//----- adiciona tema
window.onload = function () {
    console.log(localStorage.getItem('tema'))

    padrao.forEach(p => {
        p.classList.add(localStorage.getItem('tema'))
    })

    as.forEach(a => {
        if(localStorage.getItem('tema') == 'noite'){
            a.classList.remove('ancora-dia')
            a.classList.add('ancora-noite')
        }else{
            a.classList.remove('ancora-noite')
            a.classList.add('ancora-dia')
        }
        
    })
   
    
    
}