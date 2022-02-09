import { Funko } from "./funkoClass.js";

let listaFunkopop = [];
const modalFunko = new bootstrap.Modal(
  document.getElementById("modalProducto")
);
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
  limpiarFormulario();
  modalFunko.show();
});


//existeFunko=true significa que estoy editando un producto
//exusteFunko=false significa que estoy agregando un nuevo producto
let existeFunko = false;


leerDatos();

window.agregarFunkopop = function() {

  if (
    validarCodigo(document.getElementById("codigoProducto")) &&
    validarCampoRequerido(document.getElementById("nombreProducto")) &&
    validarCampoRequerido(document.getElementById("numSerie")) &&
    validarCampoRequerido(document.getElementById("categoriaProducto")) &&
    validarCampoRequerido(document.getElementById("descProducto")) &&
    validarCampoRequerido(document.getElementById("imgProducto"))
  ) {

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

  }
};

function limpiarFormulario() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
  //limpiar clase form-control para sacar las tildes del form

  //resetear la variable existeFunko
    existeFunko = false;
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
    <td>${_listaFunkopop[i].categoria}</td>
    <td>${_listaFunkopop[i].descripcion}</td>
    <td>${_listaFunkopop[i].imagen}</td>
    <td>
      <button class="btn btn-warning" onclick="modificarFunkopop(this)" id='${_listaFunkopop[i].codigo}'>Editar</button>
      <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id='${_listaFunkopop[i].codigo}'>Eliminar</button>
    </td>
  </tr>
 `;

    bodyTablaProductos.innerHTML += codigoHTML;
  }
}

window.eliminarFunkopop = function(funkopop){

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
    // aqui borrar el producto
    let funkopopFiltrados = listaFunkopop.filter((producto) =>
       producto.codigo != funkopop.id
    )
    //pasamos los funko filtrados al arreglo principal
    listaFunkopop = funkopopFiltrados;
    //guardar en localstorage
    localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
    //volver a dibujar la tabla con los productos filtrados
    leerDatos();




      Swal.fire(
        'Eliminado!',
        'Tu producto fue eliminado',
        'success'
      )
    }
  })
}

window.modificarFunkopop = function(btnEditar){
  //limpiar los datos de la ventana modal
  limpiarFormulario();
  // buscar el objeto a modificar
  let objetoEncontrado = listaFunkopop.find((producto) =>{
    return producto.codigo === btnEditar.id;
  });


  // cargar los datos en el formulario
  document.getElementById('codigoProducto').value = objetoEncontrado.codigo;
  document.getElementById('nombreProducto').value = objetoEncontrado.nombre;
  document.getElementById('numSerie').value = objetoEncontrado.numSerie;
  document.getElementById('categoriaProducto').value = objetoEncontrado.categoria;
  document.getElementById('descProducto').value = objetoEncontrado.descripcion;
  document.getElementById('imgProducto').value = objetoEncontrado.imagen;
  //cambiar el valor de la variable existeFunko
  existeFunko = true;

  modalFunko.show();
}

window.guardarFunko = function(event){
  event.preventDefault();
  if(existeFunko === true){
    //en este caso quiero modificar
    actualizarDatosFunkopop();
  }else{
    //en este caso quiero agregar un funko nuevo
    agregarFunkopop();
  }
}

function actualizarDatosFunkopop(){
  // esta funcion guarda en LS con los datos modificados
  console.log('modificar');

   let codigo = document.getElementById('codigoProducto').value;
   let nombre = document.getElementById('nombreProducto').value;
   let numSerie = document.getElementById('numSerie').value;
   let categoria = document.getElementById('categoriaProducto').value;
   let descripcion = document.getElementById('descProducto').value;
   let imagen = document.getElementById('imgProducto').value;

   //buscar el objeto que quiero modificar y cambiar sus valores
   for(let i in listaFunkopop){
     if(listaFunkopop[i].codigo === codigo){
       //encontre el funko que quiero editar
       listaFunkopop[i].nombre = nombre;
       listaFunkopop[i].numSerie = numSerie;
       listaFunkopop[i].categoria = categoria;
       listaFunkopop[i].descripcion = descripcion;
       listaFunkopop[i].imagen = imagen;
     }
   }
// guardar el arreglo de funkopop editados en LS
localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
//limpiar los datos del formulario
limpiarFormulario();
//cerrar ventana modal
modalFunko.hide();
//mostrar mensaje de modificacion exitosa
Swal.fire(
  'Modificacio Exitosa!',
  'Se actualizo correctamente su funkupop',
  'success'
);
//leer ls y dibujar los datos actualizados en la tabla
leerDatos();
}