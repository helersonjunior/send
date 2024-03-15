const firebaseConfig = {
  apiKey: "AIzaSyB22HTT47-nr0zq-oSAdvzpoEklHHiyfSI",
  authDomain: "base-d60db.firebaseapp.com",
  projectId: "base-d60db",
  storageBucket: "base-d60db.appspot.com",
  messagingSenderId: "669011923416",
  appId: "1:669011923416:web:f3a5981a354d99e80a62ad",
  measurementId: "G-T5XYFJTTF3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
const TURMA = "turmaA"
//


///////// Atualização em tempo real
db.collection("turmaA").onSnapshot((snapshot) => {
  document.querySelector(".tableConteudo").innerHTML = ""
  let carregamento = document.querySelector(".pre-carregamento")
  carregamento.style.display = "none"

  if (snapshot.docs.length == 0) {
    document.querySelector(".tableConteudo").innerHTML = "Não há mensagens"

    console.log("nao a mensagens")
  }

  snapshot.forEach((doc) => {
    console.log("snap", doc)
    let docId = doc.id
    let dados = doc.data()

    console.log("item", dados)

    adcionarCardsTela(docId, dados)

  })
})

function adcionarCardsTela(docId, dados) {
  let area = document.querySelector(".tableConteudo")

  if (dados.nomeLink) {

    let element = `<div key="${docId}" class="card">
                     <h5 class="card-title">${dados.nomeLink}</h5>
                     <div class="li"><a href="${dados.endereco}">Link</a></div>
                     <p class="data-atual">${dados.tempo}</p>
                     <button id="${docId}" onclick="apagar(this)"><img src="./assets/img/lixeira.png"></button>
                  </div>`

    area.innerHTML += element

  } else {

    let element = `<div key="${docId}" class="card">
                     <h5 class="card-title">${dados.nome}</h5>
                     <p class="msg">${dados.msg}</p>
                     <p class="data-atual">${dados.tempo}</p>
                     <button id="${docId}" onclick="apagar(this)"><img src="./assets/img/lixeira.png"></button>
                   </div>`

    area.innerHTML += element

  }
}
//


//////// Adcionar card no Firebase Firestore //////////////
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


////Apagar do Firebase
function apagar(e) {
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

///////////////////////////////////////////////////////////////



///// Buscar arquivos do firebase Storage e adciona na tela //////////////////
const area2 = document.querySelector(".tableConteudo2")
const storage = firebase.storage()
const ref = storage.ref("/arquivos")

function arquivos() {

  ref.listAll().then(res => {
    console.log("Arquivos", res.items.length)
    res.items.map(item => {

      item.getDownloadURL().then(url => {
        /* adcionarCardsTela2(url, item) */
        let element = `<div id="${item.name}" class="card">
                         <h5 class="card-title">Arquivo</h5>
                         <div class="arq"><a href="${url}">${item.name}</a></div>
                         <p class="data-atual">00:00 - 00/00/0000</p>
                         <button id="${item.name}" onclick="deletar('${item.name}')"><img src="./assets/img/lixeira.png"></button>
                      </div>`

        area2.innerHTML += element

      })
    })
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

///// deleta arquivo da Storage
function deletar(item) {
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

arquivos()

//////////////////////////////////////////////////////////////////////


// Modal
const modal = document.querySelector('.modal-container')
const btnSalvar = document.querySelector('#btnSalvar')
const btnEnviar = document.querySelector('#btnEnviar')

function openModal(index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
}

// Modal 2
const modal_2 = document.querySelector('.modal-container-2')

function modalLogin() {
  modal_2.classList.add('active')
  modal_2.onclick = e => {
    if (e.target.className.indexOf('modal-container-2') !== -1) {
      modal_2.classList.remove('active')
    }
  }
}

///////// Enviar mensagem ou link///////////
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
///////////////////////////


/////// Enviar arquivo para Firebase Storage ////////
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
//////////////////////////////





///////// Envia arquivo para Storage com onChange do input ////////////

/* arquivo.addEventListener("change", (e) => {
  const file = e.target.files[0]
  let arquivoUp = ref.child(file.name).put(file)

arquivoUp.on('state_changed', upload =>{

    console.log("mudou o estado", upload)

    if (upload.state == "running") {

      var progresso = Math.round((upload.bytesTransferred / upload.totalBytes) * 100)
      let porcentagem = document.querySelector('.porcentagem')
      porcentagem.style.display = "flex"
      porcentagem.innerHTML = `${progresso}%`
      console.log(`${progresso}%`)

    }

  }, error => {
    avisoErro()
    console.log("error", error)
  }, () => {
    console.log("completou")
    let porcentagem = document.querySelector('.porcentagem')
    porcentagem.style.display = "none"
    avisoSucesso()
    arquivo.value = ""
    document.querySelector(".tableConteudo2").innerHTML = ""
    arquivos()
  })
})
*/

/////////////////////

/* // Reference to the file
var fileRef = firebase.storage().ref('/arquivos');

// Get the metadata for the file
ref.getMetadata().then(function(metadata) {
  // Get the creation time of the file
  var creationTime = metadata.timeCreated;
  
  // Get the modification time of the file
  var modificationTime = metadata.updated;
  
  // Convert the creation time and modification time to date objects
  var creationDate = new Date(creationTime);
  var modificationDate = new Date(modificationTime);
  
  console.log('Creation time:', creationDate);
  console.log('Modification time:', modificationDate);
}).catch(function(error) {
  console.log('Error getting metadata:', error);
});
 */


////////////////////////////////////
/////////////////AUTH///////////////
////////////////////////////////////
let auth = firebase.auth()

/*  login e autenticão de usuario  */
function loginFirebase(email, senha) {

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {

    auth.signInWithEmailAndPassword(email, senha)
      .then(loggedUser => {
        console.log(auth.currentUser)
        location.reload()

      }).catch(error => {
        const errorMessage = getTranslatedErrorMessage(error);
        console.log('Error traduzido:', errorMessage);
        console.log(error)

      })

  }).catch(error => {
    console.log(error)
  })
}

/////  deslogar 
function logout() {
  auth.signOut().then(() => {
    console.log('Usuario foi deslogado')
  })
    .catch(error => {
      console.log("Erro ao deslogar usuario", error)
    })
}
//logout()



window.onload = function () {

  ///// observa se há usuario e mudançãs na autenticação (login e logout) 
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("usuario", user)
      if (user.uid == 'ZCRPAzOFngd90O0yiAk72Cmqiz02') {
        console.log('Certo')
      }
    } else {
      loginFirebase('helersonjunior@gmail.com', 'helersonjunior2024')
      console.log('logando')

    }
  })

  console.log("onload")
} 
