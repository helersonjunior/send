


function arquivo2(){
pastaRef.listAll().then(result => { 
    result.items.forEach( itemRef => {
      // Obtenha o link de download de cada arquivo
      itemRef.getDownloadURL().then(downloadURL => {
        // Obtenha os metadados de cada arquivo
        itemRef.getMetadata().then(metadata => {
          console.log(metadata);
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
          adcionarCardsTela2_(item, url , data) 

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
    console.log(error);
    if (error.code === 'storage/unauthorized') {
        /// O usuário não tem permissão para acessar o arquivo
        console.log('Storage : Missing or insufficient permissions.');
    } else {
        /// Outro erro ocorreu 
        console.error('Erro ao acessar o arquivo:', error)
    }

  });
}  

function adcionarCardsTela2_(item, url, data) {

    let element = `<div id="${item.name}" class="card mb-4">
      <div class="card-header">
          <h5 class="card-title">Arquivo</h5>
          <p class="data-atual"></p>
      </div>
      <div class="card-body flexButton">
          <div class="card-text"><h5><small><span>Msg: </span></small></h5><a href="${url}}" target="blank">${item.name}</a></div>
          <p class="data-atual">${data}</p>
          <button class="btn btn-outline-danger btn-sm" onclick="deletar('${item.name}')">Excluir</button>
      </div>
    </div>`
  
    area2.innerHTML += element
  
}