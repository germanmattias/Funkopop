import {Funko} from './funkoClass.js';

let listaFunkopop = [];

window.agregarFunkopop = function(event){
  event.preventDefault();
  if (validarCodigo(document.getElementById('codigoProducto')) &&
  validarCampoRequerido(document.getElementById('nombreProducto')) &&
  validarCampoRequerido(document.getElementById('numSerie')) &&
  validarCampoRequerido(document.getElementById('categoriaProducto')) &&
  validarCampoRequerido(document.getElementById('descProducto')) &&
  validarCampoRequerido(document.getElementById('imgProducto'))) {

      console.log('datos correctos');
      //crear un nuevo objeto  funko
      let nuevoFunko = new Funko(document.getElementById('codigoProducto').value,
      document.getElementById('nombreProducto').value,
      document.getElementById('numSerie').value,
      document.getElementById('categoriaProducto').value,
      document.getElementById('descProducto').value,
      document.getElementById('imgProducto').value)
      //guardar el funko en el arreglo
      listaFunkopop.push(nuevoFunko);
      //guardar los datos en el localstorage
  } else {
    console.log('datos incorrectos');
  }
}