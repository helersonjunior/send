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
firebase.initializeApp(firebaseConfig)
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

  console.log("Firestore", snapshot.docs.length)
  if (snapshot.docs.length == 0) {
    document.querySelector(".tableConteudo").innerHTML = "Não há mensagens"
    console.log("nao a mensagens")
  }

  snapshot.forEach((doc) => {
    // console.log("snap", doc) 
    let docId = doc.id
    let dados = doc.data()

    /// chama a função para adicionar cards na tela
    adcionarCardsTela(docId, dados)

  })
}, (error) => {
  if(error.code == 'permission-denied'){
    document.getElementById('permission').innerHTML = 'Acesso proibido'
    console.log("onSnapshot - Firestore : Acesso proibido")
  }else{
    document.getElementById('permission').innerHTML = error.message
    console.log("onSnapshot - Firestore :", error.message)
  }
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

/////  Adcionar card no Firebase Firestore  
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
    }).catch(error => {
      avisoErro()
      console.log("Erro ao inserir o documento", error)
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
    }).catch(error => {
      avisoErro()
      console.log("Erro ao inserir o documento", error)
    })
  }
}


/*  Apagar do Firebase */
function apagar(e) {
  let confirmar = confirm("Excluir ?")
  if (confirmar) {
    db.collection(TURMA).doc(e.id).delete()
      .then(() => {
        avisoExcluido()
        console.log("Documento apagado com sucesso")
      }).catch(error => {
        console.log("Erro ao apagar o documento", error)
      })
  }
}




///////////////////////////////////////
//////////////// STORAGE //////////////
///////////////////////////////////////

/// Buscar arquivos do firebase Storage e adciona na tela  
const area2 = document.querySelector(".tableConteudo2")
const storage = firebase.storage()
const pastaRef = storage.ref("/arquivos")

function arquivos(){
  pastaRef.listAll().then(result => {
    console.log("Storage", result.items.length) 
      result.items.forEach( itemRef => {
        // Obtenha o link de download de cada arquivo
        itemRef.getDownloadURL().then(downloadURL => {
          // Obtenha os metadados de cada arquivo
          itemRef.getMetadata().then(metadata => {
            //console.log(metadata);
            // Aqui você pode manipular os metadados e o link de download como desejar
            // Por exemplo, exibir os metadados e o link de download em elementos HTML na página
  
            ///////////////////////////////////
            var dataHora = metadata.timeCreated
            var dataObj = new Date(dataHora);
            
            // Converter para o fuso horário do Brasil (Brasília)
            var fusoHorarioBrasil = "America/Sao_Paulo";
            dataObj.toLocaleString('pt-BR', { timeZone: fusoHorarioBrasil });
            
            /////////////////// Dia/mês/Ano
            var dia = dataObj.getUTCDate();
            var mes = dataObj.getUTCMonth() + 1; // O mês começa do zero, por isso adicionamos 1
            var ano = dataObj.getUTCFullYear();
            /// Adiciona um 0 se for menor que 10
            let d_ = dia < 10 ? "0" + dia : dia
            let m_ =  mes < 10 ? "0" + mes : mes
            /// Data formatada
            var dataFormatada = d_ + '/' + m_ + '/' + ano; 
            //console.log("data", dataFormatada); 
     
            /////////////////// Hora 00:00
            var horas = dataObj.getHours();
            var minutos = dataObj.getMinutes();
            /// Hora formatada
            var horaFormatada = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
            ///console.log("hora", horaFormatada);
            
            let data = horaFormatada + " - "  + dataFormatada
           
            // chama a função para adcionar card na tela
            adcionarCardsTela2(itemRef, downloadURL , data) 
  
            // catch do getMetadata
          }).catch( error => {
            console.log('getMetadata',error);
          });
  
          // catch do getDownloadUrl
        }).catch( error => {
          console.log('getDownloadUrl',error);
        });
      }); 
  
      // catch do listAll
    }).catch( error => {
      if (error.code === 'storage/unauthorized') {
          /// O usuário não tem permissão para acessar o arquivo
          console.log('Storage : Acesso proibido');
      } else {
          /// Outro erro ocorreu 
          console.error('Erro ao acessar o arquivo:', error)
      }
  
    });
  }

function adcionarCardsTela2(itemRef, downloadURL, data) {

  let element =
   `<div id="${itemRef.name}" class="card">
      <div>
        <h5 class="card-title">Arquivo</h5>
        <div class="arq"><a href="${downloadURL}">${itemRef.name}</a></div>
        <p class="data-atual">${data}</p>
      </div>
      <button id="${itemRef.name}" onclick="deletar('${itemRef.name}')"><img src="./assets/img/lixeira.png"></button>
  </div>`

    area2.innerHTML += element
  
}  

/* deleta arquivo da Storage */
function deletar(item) {
  let confirmar = confirm("Deletar ?")
  if (confirmar) {
    let cardElement = document.getElementById(item)
    pastaRef.child(item).delete().then(() => {

      console.log("deletou com sucesso", cardElement)
      avisoExcluido()
      cardElement.remove()
      console.log("item", item)
    }).catch(error => {
      console.log("erro", error)
    })
  }
}

///// Evento de click - STORAGE 
const btnEnviar = document.querySelector('#btnEnviar')
btnEnviar.onclick = e => {
  e.preventDefault()

  const arquivo = document.querySelector("#arquivo")
  const file = arquivo.files[0]
  console.log("file", file)

  modal_1.classList.remove('active')

  if (file != undefined) {

    let arquivoUp = pastaRef.child(file.name).put(file)

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

/////  cria um usuario  
function registerFirebase(email, senha) {

  auth.createUserWithEmailAndPassword(email, senha)
    .then(user => {
      console.log("Usuario criado", user)

      /// modal
      modal_2.classList.remove('active')

    }).catch(error => {
      const errorMessage = getTranslatedErrorMessage(error);
      console.log("Erro ao criar usuario", error)

      /// modal
      title.style.display = 'none'
      erro.style.display = 'block'
      erro.innerHTML = errorMessage
      btnRegister.classList.remove('enviando')
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
        const errorMessage = getTranslatedErrorMessage(error);
        console.log('Error traduzido:', errorMessage);
        console.log(error)

        /// modal
        title.style.display = 'none'
        erro.style.display = 'block'
        erro.innerHTML = errorMessage
        btnLogin.classList.remove('enviando')
      })

  }).catch(error => {
    console.log(error)
  })

}

/////  deslogar 
function logout() {
  auth.signOut().then(() => {
    console.log('Usuario foi deslogado')
    location.reload()
  })
    .catch(error => {
      console.log("Erro ao deslogar usuario", error)
    })
}

///// reset email 
function resetEmail(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email de reset enviado')
      document.getElementById('title').style.display = 'block'
      document.getElementById('title').innerHTML = 'Email enviado'
      document.getElementById('recuperar').style.display = 'none'
      document.getElementById('erro').style.display = 'none'
      btnRecSenha.classList.remove('enviando')

      setTimeout(()=>{
        resetModal()
      }, 3000)
    }).catch(error => {
      const errorMessage = getTranslatedErrorMessage(error);
      console.log(error)

      /// modal
      title.style.display = 'none'
      erro.style.display = 'block'
      erro.innerHTML = errorMessage
      btnRecSenha.classList.remove('enviando')
    })
}

///// observa se há usuario e mudançãs na autenticação (login e logout) 
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('MD').style.display = 'none'
    document.getElementById('emailUsuario').innerHTML = user.email
    document.getElementById('sair').style.display = 'inline-block'

    if (user.uid == 'ZCRPAzOFngd90O0yiAk72Cmqiz02') {
      document.querySelector('.pre-carregamento').style.display = 'flex'
    }
  } else {
    console.log('Ninguem logado')
  }
})




