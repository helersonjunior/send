const firebaseConfig = {
  apiKey: "AIzaSyB22HTT47-nr0zq-oSAdvzpoEklHHiyfSI",
  authDomain: "base-d60db.firebaseapp.com",
  projectId: "base-d60db",
  storageBucket: "base-d60db.appspot.com",
  messagingSenderId: "669011923416",
  appId: "1:669011923416:web:f3a5981a354d99e80a62ad",
  measurementId: "G-T5XYFJTTF3"
};

///// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
const TURMA = "turmaA"

///////////////////////////////////////
/////////////// FIRESTORE /////////////
///////////////////////////////////////

/* atualiza apenas quando carrega */
/* db.collection(TURMA).get().then(arquivos => {
  
}).catch(erro => {
  document.getElementById('permission').innerHTML = erro.message
  console.log("GET - Firestore :", erro.message)
}) */



/* Atualização em tempo real */
db.collection("turmaA").onSnapshot((snapshot) => {
  document.querySelector(".tableConteudo").innerHTML = ""
  let carregamento = document.querySelector(".pre-carregamento")
  carregamento.style.display = "none"

  if (snapshot.docs.length == 0) {
    document.querySelector(".tableConteudo").innerHTML = "Não há mensagens"

    console.log("nao a mensagens")
  }

  snapshot.forEach((doc) => {
    /* console.log("snap", doc) */
    let docId = doc.id
    let dados = doc.data()

    /* console.log("item", dados) */

    adcionarCardsTela(docId, dados)

  })
},(error) =>{
  document.getElementById('permission').innerHTML = error.message
  console.log("onSnapshot - Firestore :", error.message)
}
)



function adcionarCardsTela(docId, dados) {
  let area = document.querySelector(".tableConteudo")

  if (dados.nomeLink) {

    let element = `<div key="${docId}" class="card">
                     <div>
                     <h5 class="card-title">${dados.nomeLink}</h5>
                     <div class="li"><a href="${dados.endereco}">Link</a></div>
                     <p class="data-atual">${dados.tempo}</p>
                     </div>
                     <button id="${docId}" onclick="apagar(this)"><img src="./assets/img/lixeira.png"></button>
                  </div>`

    area.innerHTML += element

  } else {

    let element = `<div key="${docId}" class="card">
                     <div>
                     <h5 class="card-title">${dados.nome}</h5>
                     <p class="msg">${dados.msg}</p>
                     <p class="data-atual">${dados.tempo}</p>
                     </div>
                     <button id="${docId}" onclick="apagar(this)"><img src="./assets/img/lixeira.png"></button>
                   </div>`

    area.innerHTML += element

  }
}
//


/*  Adcionar card no Firebase Firestore  */
function adicionar(nome, conteudo) {
  let label1 = document.querySelector(".label1")

  let horaData = hora()

  if (label1.innerText == "Nome do link") {

    db.collection(TURMA).add({
      nomeLink: nome,
      endereco: conteudo,
      tempo: horaData
    }).then((doc) => {
      avisoSucesso()
      console.log("Documento inserido", doc)
      document.querySelector("#m-nome").value = ""
      document.querySelector("#m-conteudo").value = ""
    }).catch(err => {
      avisoErro()
      console.log(err)
    })

  } else {

    db.collection(TURMA).add({
      nome: nome,
      msg: conteudo,
      tempo: horaData
    }).then((doc) => {
      avisoSucesso()
      console.log("Documento inserido", doc)
      document.querySelector("#m-nome").value = ""
      document.querySelector("#m-conteudo").value = ""
    }).catch(err => {
      avisoErro()
      console.log(err)
    })
  }
}


/*  Apagar do Firebase */
function apagar(e) {
  let confirmar = confirm("Deletar ?")
  if (confirmar) {
    console.log("apagar")
    let id = e.id
    db.collection(TURMA).doc(id).delete()
      .then(() => {
        avisoExcluido()
        console.log("documento apagado com sucesso")
      }).catch(err => {
        console.log(err)
      })
  }
}

/* Evento para adcionar no FIRESTORE*/
const btnSalvar = document.querySelector('#btnSalvar')
btnSalvar.onclick = e => {
  const nome = document.querySelector("#m-nome").value
  const conteudo = document.querySelector("#m-conteudo").value

  if (nome == '' || conteudo == '') {
    return
  }

  e.preventDefault()

  modal.classList.remove('active')

  adicionar(nome, conteudo)
}


///////////////////////////////////////
//////////////// STORAGE //////////////
///////////////////////////////////////

/*  Buscar arquivos do firebase Storage e adciona na tela  */
const area2 = document.querySelector(".tableConteudo2")
const storage = firebase.storage()
const ref = storage.ref("/arquivos")

function arquivos() {
  /* 
     ref.getDownloadURL() .then((url) => { 
      // Aqui você pode usar o URL do arquivo
       console.log('URL do arquivo:', url);
      }) .catch((error) => { if (error.code === 'storage/unauthorized') { 
      // O usuário não tem permissão para acessar o arquivo 
      console.log('Usuário não tem permissão para acessar o arquivo.'); } else { 
      // Outro erro ocorreu
       console.error('Erro ao acessar o arquivo:', error); } });
   */
  ref.listAll().then(res => {
    console.log("Arquivos", res.items.length)
    res.items.map(item => {

      item.getDownloadURL().then(url => {
        /* adcionarCardsTela2(url, item) */
        let element = `<div id="${item.name}" class="card">
                         <div>
                         <h5 class="card-title">Arquivo</h5>
                         <div class="arq"><a href="${url}">${item.name}</a></div>
                         <p class="data-atual">00:00 - 00/00/0000</p>
                         </div>
                         <button id="${item.name}" onclick="deletar('${item.name}')"><img src="./assets/img/lixeira.png"></button>
                      </div>`

        area2.innerHTML += element

      })
    })
  }).catch(error => {
    if (error.code === 'storage/unauthorized') {
      // O usuário não tem permissão para acessar o arquivo
      console.log('Storage : Missing or insufficient permissions.');
    } else {
      // Outro erro ocorreu 
       console.error('Erro ao acessar o arquivo:', error)
    }
  })
}


function adcionarCardsTela2(url, item) {

  let element = `<div id="${item.name}" class="card mb-4">
    <div class="card-header">
        <h5 class="card-title">Arquivo</h5>
        <p class="data-atual"></p>
    </div>
    <div class="card-body flexButton">
        <div class="card-text"><h5><small><span>Msg: </span></small></h5><a href="${url}}" target="blank">${item.name}</a></div>
        <p class="data-atual">00:00 - 00/00/0000</p>
        <button class="btn btn-outline-danger btn-sm" onclick="deletar('${item.name}')">Excluir</button>
    </div>
  </div>`

  area2.innerHTML += element

}

/* deleta arquivo da Storage */
function deletar(item) {
  let confirmar = confirm("Deletar ?")
  if (confirmar) {
    let cardElement = document.getElementById(item)
    ref.child(item).delete().then(() => {

      console.log("deletou com sucesso", cardElement)
      avisoExcluido()
      cardElement.remove()
      console.log("item", item)
    }).catch(error => {
      console.log("erro", error)
    })
  }
}

/* Evento para enviar para STORAGE */
const btnEnviar = document.querySelector('#btnEnviar')
btnEnviar.onclick = e => {
  e.preventDefault()

  const arquivo = document.querySelector("#arquivo")
  const file = arquivo.files[0]
  console.log("file", file)

  modal.classList.remove('active')

  if (file != undefined) {

    let arquivoUp = ref.child(file.name).put(file)

    arquivoUp.on('state_changed', upload => {

      console.log("mudou o estado", upload)

      if (upload.state == "running") {

        var progresso = Math.round((upload.bytesTransferred / upload.totalBytes) * 100)
        let porcentagem = document.querySelector('.MensagemFlesh')
        porcentagem.classList.remove("sucesso")
        porcentagem.classList.remove("erro")
        porcentagem.classList.remove("apagado")
        porcentagem.style.display = "flex"
        porcentagem.style.color = "blue"
        porcentagem.innerHTML = `${progresso}%`
        console.log(`${progresso}%`)

      }

    }, error => {
      avisoErro()
      console.log("error", error)
    }, () => {
      console.log("completou")
      let porcentagem = document.querySelector('.MensagemFlesh')
      porcentagem.style.display = "none"
      porcentagem.style.color = "white"
      avisoSucesso()
      arquivo.value = ""
      document.querySelector(".tableConteudo2").innerHTML = ""
      arquivos()
    })
  }
}

arquivos()

///////////////////////////////////////
//////////////// AUTH /////////////////
///////////////////////////////////////

let auth = firebase.auth()

/*  cria um usuario  */
function registerFirebase(email, senha) {
  console.log("x", { email, senha })

  auth.createUserWithEmailAndPassword(email, senha)
    .then(user => {
      console.log("Usuario", user)
      document.querySelector('.modal-container-2').style.display='none'
    }).catch(error => {
      console.log("Erro ao criar usuario", error)
      document.getElementById('title').style.display = 'none'
      let erro = document.getElementById('erro')
      erro.style.display = 'block'
      erro.innerHTML = error.message
    })
}

/*  login e autenticão de usuario  */
function loginFirebase(email, senha) {

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {

    auth.signInWithEmailAndPassword(email, senha)
      .then(loggedUser => {
        console.log(auth.currentUser)
        location.reload()

      }).catch(error => {
        console.log(error.message)
        document.getElementById('title').style.display = 'none'
        let erro = document.getElementById('erro')
        erro.style.display = 'block'
        erro.innerHTML = error.message
        btnLogin.classList.remove('enviando')
      })

  }).catch(error => {
    console.log(error)
  })

}

/*  deslogar */
function logout() {
  auth.signOut().then(() => {
    console.log('Usuario foi deslogado')
    location.reload()
  })
    .catch(error => {
      console.log("Erro ao deslogar usuario", error)
    })
}

/*  reset email */
function resetEmail(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email de reset enviado')
      document.getElementById('title').style.display = 'block'
      document.getElementById('title').innerHTML= 'Email enviado'
      document.getElementById('recuperar').style.display='none'
      document.getElementById('erro').style.display='none'
    }).catch(error=>{
      console.log(error)
      document.getElementById('title').style.display = 'none'
      let erro = document.getElementById('erro')
      erro.style.display = 'block'
      erro.innerHTML = error.message
    })
}

/* observa se há usuario e mudançãs na autenticação (login e logout) */
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('MD').style.display = 'none'
    document.getElementById('emailUsuario').innerHTML = user.email
    document.getElementById('sair').style.display = 'inline-block'

    if(user.uid == 'ZCRPAzOFngd90O0yiAk72Cmqiz02'){
      document.querySelector('.pre-carregamento').style.display = 'flex'
    }
  } else {
    console.log('Ninguem logado')
  }
})




