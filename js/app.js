const carrito = document.querySelector('#carrito');
const Contenedorcarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const Listacursos = document.querySelector('#lista-cursos');

let articuloCarrito = [];

cargarEventListners();

function cargarEventListners (){
    Listacursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarArticulo);
   // carrito.addEventListener('click', btnVaciarCarrito);

}

// function btnVaciarCarrito(e){
// //     if(e.target.classList.contains('')){

// //     }

// // } 

function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-curso')){
            console.log('click borrar');
            const articuloId = e.target.getAttribute('data-id')
            articuloCarrito = articuloCarrito.filter(articulo => articulo.id !== articuloId)
            carritoHTML();
    } 

}
//funcion 

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
       const cursosSeleccionado = e.target.parentElement.parentElement;
        console.log(cursosSeleccionado);
        leerDatoscurso(cursosSeleccionado);
    }
   
}


function leerDatoscurso(curso){
     const infoCurso = {
      imagen : curso.querySelector('img').src,
      titulo : curso.querySelector('h4').textContent,
      precio : curso.querySelector('.precio span ').textContent,
      id : curso.querySelector('a').getAttribute('data-id'),
      cantidad : 1
     }
    
     const existe = articuloCarrito.some(articulo => articulo.id === infoCurso.id)

      if(existe){
         const articulos = articuloCarrito.map(articulo => {
             if(articulo.id===infoCurso.id){
                  articulo.cantidad++;
                  return articulo;
             }else{
                return articulo;
             }
         } )
         articuloCarrito = [...articulos];

      }else{
        articuloCarrito = [...articuloCarrito, infoCurso];
      }

//articuloCarrito.push(infoCurso);

carritoHTML();

}
 


carritoHTML();

function carritoHTML(){
    limpiarHTML();
    articuloCarrito.forEach(({titulo, imagen, precio, id, cantidad}) => {
        //const {titulo, imagen, precio, id, cantidad} = articulo;
        const row = document.createElement('TR');
        
        row.innerHTML = `
         <td>
         <img src = '${imagen}' width = 100 />
         </td>
          <td>
             ${titulo}
          </td>
          <td> ${precio} </td>
          <td> ${cantidad} </td>
          <td>  
              <a href ='#' class = 'borrar-curso' data-id = "${id}">  x  <a/>
          </td>
        `;

        Contenedorcarrito.appendChild(row);
    });

      
}

function limpiarHTML(){
    //MANERA sencilla
    // Contenedorcarrito.innerHTML = '';
    //mejor forma
    while(Contenedorcarrito.firstChild){
        Contenedorcarrito.removeChild(Contenedorcarrito.firstChild);

    }
}




