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
/////////////////////////

// Acessar uma coleção do Firestore
db.collection(TURMA).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
      console.log("Conectado")
        //console.log(doc.id, " => ", doc.data())
    })
  })
  .catch(function (error) { console.error("Erro ao acessar a coleção:", error); });
 

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

// Modal
const modal = document.querySelector('.modal-container')
const btnSalvar = document.querySelector('#btnSalvar')


function openModal(index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
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


///////////////// STORAGE ////////////////////////
const btnEnviar = document.querySelector('#btnEnviar')
const storage = firebase.storage()
const ref = storage.ref("/arquivos")

// Enviar arquivo para Firebase Storage //
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
    })
  }
}






