console.log('esta chamamndo!');
//var lista = {data:[]};
//let lista = window.localStorage.getItem('lista') || '{data:[]}';
let lista = window.localStorage.getItem('lista') || '{"data":[]}';

lista = JSON.parse(lista);
console.log(lista);
let updateLista  = function(){
    /**/
    Array.observe(lista.data, function(changes){
        let index= null;
        let value='';
        let status = null;
        console.log(changes);
            if(changes[0].type === 'splice'){
                index = changes[0].index;
                value = changes[0].object[index];
                status = (changes[0].addedCount > 0)? 'Criado': 'Removido';        
            }
           
            if(changes[0].type === 'update'){
                index = changes[0].name;
                value = changes[0].object[index];
                status = 'atualizado';        
            }
            if(!value && status === 'Criado' && status === 'atualizado'){
                return;
            }
            
            let listaTag = document.getElementById('resposta');
                if(status === 'atualizado'){
                    console.log('implementar');
                }
                if(status === 'Removido'){
                    let listaDeNotas = document.querySelectorAll('#resposta li');
                    listaTag.removeChild(listaDeNotas[index]);
                }
                if(status === 'Criado'){
                    console.log('criado');
                    let newLi = document.createElement('li');
                    newLi.innerHTML = value;
                    listaTag.appendChild(newLi);
                }
                window.localStorage.setItem('lista',JSON.stringify(lista));                                
    });
    /**/
}

//eventos antigos
/*
function add(){
    console.log('clicado');
    let valor = window.document.querySelector("#valorTexto");
    //resposta
    let resposta = window.document.querySelector("#resposta");
    let item = document.createElement('li');
    item.innerHTML = valor.value;
    resposta.appendChild(item);
}
*/
//novo sistema
criarNotas = function(){
    let texto = window.document.querySelector("#valorTexto");
    let valor = texto.value;
    //adicionando o valor no final do array
    lista.data.push(valor);
    console.log(lista);
    texto.value ="";

}

updateLista();

document.addEventListener('DOMContentLoaded',function(event){
console.log('abrindo os trabalhos');
let listaDeNotaz  = document.getElementById('resposta');
let listHTML = '';

for (let i = 0; i < lista.data.length; i++) {
    listHTML+= `<li>${lista.data[i]}</li>`;
    
}
listaDeNotaz.innerHTML=listHTML;

    let formNotas = document.querySelector('#formNotas');
        formNotas.addEventListener('submit',function(e){
            e.preventDefault();
            console.log('funcionando como uma engrenagem');
            criarNotas();
        });
});
//eventos na lista
document.addEventListener('click', function(e){
    let resposta = document.getElementById('resposta');
        if(e.target.parentElement == resposta){
           if(confirm('remoer essa nota?')){
               let listaDeItens = document.querySelectorAll('#resposta li');
                    listaDeItens.forEach(function(item, index){
                        if(e.target===item){
                            lista.data.splice(index,1);
                        }        
                    });
           }     
        }
});
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js')
    .then(function(reg){
        console.log('Service Worker Registred!');
    })
    .catch(function(err){
        console.log('error ',err);
    });
}
