//logica pagina principal

let listaFunkopop = [];
leerProductos();


function leerProductos(){
  //esta funcion trae los datos del LS y los dibuja en la pagina principal
  if(localStorage.length > 0){
    listaFunkopop = JSON.parse(localStorage.getItem('listaFunkoKey'));
    dibujarCard();
  }
}

function dibujarCard(){
  let fila = document.getElementById('listFunko');
  fila.innerHTML = '';

  console.log(listaFunkopop);
}