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
      localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
      //mostrar cartel de datos guardados
      Swal.fire(
        "Nuevo Funkopop",
        "El funkopop se agrego correctamente",
        "success"
      );
      //limpiar formulario
      limpiarFormulario()
  } else {
    console.log('datos incorrectos');
  }
}

function limpiarFormulario(){
  let formulario = document.getElementById('formProducto');
  formulario.reset();
  //limpiar clase form-control para sacar las tildes del form

}