import { Funko } from "./funkoClass.js";

let listaFunkopop = [];
const modalFunko = new bootstrap.Modal(
  document.getElementById("modalProducto")
);
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
  modalFunko.show();
});

leerDatos();

window.agregarFunkopop = function (event) {
  event.preventDefault();
  if (
    validarCodigo(document.getElementById("codigoProducto")) &&
    validarCampoRequerido(document.getElementById("nombreProducto")) &&
    validarCampoRequerido(document.getElementById("numSerie")) &&
    validarCampoRequerido(document.getElementById("categoriaProducto")) &&
    validarCampoRequerido(document.getElementById("descProducto")) &&
    validarCampoRequerido(document.getElementById("imgProducto"))
  ) {
    console.log("datos correctos");
    //crear un nuevo objeto  funko
    let nuevoFunko = new Funko(
      document.getElementById("codigoProducto").value,
      document.getElementById("nombreProducto").value,
      document.getElementById("numSerie").value,
      document.getElementById("categoriaProducto").value,
      document.getElementById("descProducto").value,
      document.getElementById("imgProducto").value
    );
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
    limpiarFormulario();
    //leer datos
    leerDatos();
    //cerrar la ventana modal
    modalFunko.hide();
  } else {
    console.log("datos incorrectos");
  }
};

function limpiarFormulario() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
  //limpiar clase form-control para sacar las tildes del form
}

//leer datos del localstorage

function leerDatos() {
  if (localStorage.length > 0) {
    let _listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));

    if (listaFunkopop.length === 0) {
      listaFunkopop = _listaFunkopop;
    }

    dibujarDatos(_listaFunkopop);
  }
}

function dibujarDatos(_listaFunkopop) {
  let bodyTablaProductos = document.getElementById("tbodyProductos");
  bodyTablaProductos.innerHTML = "";
  let codigoHTML = "";
  for (let i in _listaFunkopop) {
    codigoHTML = `
    <tr>
    <th scope="row">${_listaFunkopop[i].codigo}</th>
    <td>${_listaFunkopop[i].nombre}</td>
    <td>${_listaFunkopop[i].numSerie}</td>
    <td>@${_listaFunkopop[i].categoria}</td>
    <td>${_listaFunkopop[i].descripcion}</td>
    <td>${_listaFunkopop[i].imagen}</td>
    <td>
      <button class="btn btn-warning">Editar</button>
      <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id='${_listaFunkopop[i].codigo}'">Eliminar</button>
    </td>
  </tr>
 `;

    bodyTablaProductos.innerHTML += codigoHTML;
  }
}

window.eliminarFunkopop = function(funkopop){
  console.log('prueba');
  Swal.fire({
    title: 'Estas seguro que quieres eliminar el Funkopop?',
    text: 'No podras revertirlo',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed){




      Swal.fire(
        'Eliminado!',
        'Tu producto fue eliminado',
        'success'
      )
    }
  })
}