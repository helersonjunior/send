


function arquivos() {
    ref.listAll().then(res => {
      console.log("Arquivos", res.items.length)
      res.items.map(item => {
  
        item.getDownloadURL().then(url => {
  
          item.getMetadata().then(function (metadata) {
  
                     ///////////////////////////////////
                     var dataHora = metadata.timeCreated
                     var dataObj = new Date(dataHora);
                     
                     // Converter para o fuso horário do Brasil (Brasília)
                     var fusoHorarioBrasil = "America/Sao_Paulo";
                     dataObj.toLocaleString('pt-BR', { timeZone: fusoHorarioBrasil });
                     
                     ///////////////////
                     var dia = dataObj.getUTCDate();
                     var mes = dataObj.getUTCMonth() + 1; // O mês começa do zero, por isso adicionamos 1
                     var ano = dataObj.getUTCFullYear();
                     /// Adiciona um 0 se for menor que 10
                     let d_ = dia < 10 ? "0" + dia : dia
                     let m_ =  mes < 10 ? "0" + mes : mes
                     /// Data formatada
                     var dataFormatada = d_ + '/' + m_ + '/' + ano; 
                     //console.log("data", dataFormatada); 
              
                     ///////////////////
                     var horas = dataObj.getHours();
                     var minutos = dataObj.getMinutes();
                     /// Hora formatada
                     var horaFormatada = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
                     ///console.log("hora", horaFormatada);
                     
                     let res = horaFormatada + " - "  + dataFormatada
  
          
            /// adcionarCardsTela2(url, item) 
            let element = `<div id="${item.name}" class="card">
          <div>
          <h5 class="card-title">Arquivo</h5>
          <div class="arq"><a href="${url}">${item.name}</a></div>
          <p class="data-atual">${res}</p>
          </div>
          <button id="${item.name}" onclick="deletar('${item.name}')"><img src="./assets/img/lixeira.png"></button>
       </div>`
  
            area2.innerHTML += element
          }).catch(function (error) {
            console.log(error);
          });
  
  
        })
  
  
      })
    }).catch(error => {
      if (error.code === 'storage/unauthorized') {
        /// O usuário não tem permissão para acessar o arquivo
        console.log('Storage : Missing or insufficient permissions.');
      } else {
        /// Outro erro ocorreu 
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