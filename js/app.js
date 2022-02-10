//logica pagina principal

let listaFunkopop = [];
leerProductos();

function leerProductos() {
  //esta funcion trae los datos del LS y los dibuja en la pagina principal
  if (localStorage.length > 0) {
    listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
    dibujarCard();
  }
}

function dibujarCard() {
  let fila = document.getElementById("listFunko");
  fila.innerHTML = "";
  let informacionFunko = "";
  for (let i in listaFunkopop) {
  //agregar una imagen por defecto en caso de no cargar una en el form

  if(listaFunkopop[i].imagen === ''){
    img = 'img/productos/tony.png';
  }else{
    img = `img/productos/${listaFunkopop[i].imagen}`;
  }

    informacionFunko = `<div class="col-md-3 mt-3">
    <div class="card">
      <img src="${img}" class="card-img-top" alt="funkopop ${listaFunkopop[i].nombre}">
      <div class="card-body">
        <h5 class="card-title">${listaFunkopop[i].nombre}</h5>
        <p class="card-text">${listaFunkopop[i].descripcion}</p>
        <p class="card-text">${listaFunkopop[i].categoria}</p>
        <a href="#" class="btn btn-primary disabled">Ver más...</a>
      </div>
    </div>
  </div>`;

    fila.innerHTML += informacionFunko;

  }
}
