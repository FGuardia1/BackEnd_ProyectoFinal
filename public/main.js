let seccionMuestrarioProd = document.getElementById("products-container");
let btnCerrarSesion = document.getElementById("btn_cerrar_sesion");
let carritoTabla = document.getElementById("tablaCarrito");
let botonPedido = document.getElementById("botonPedido");
let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
let dropdownMenu = document.getElementsByClassName("dropdown-menu");

seccionMuestrarioProd.addEventListener("click", agregarProducto);
botonVaciarCarrito.addEventListener("click", vaciarCarrito);
botonPedido.addEventListener("click", crearPedido);
dropdownMenu[0].addEventListener("click", filtrarCategoria);
carritoTabla.addEventListener("click", quitarDeCarrito);

async function comprobarRespuesta(resp) {
  if (resp.status == 500) {
    let error = await resp.json();
    //redirecciono a mostrar el error enviandolo por query que fue encodeado como un uri, para ser decodeado y mostrado en pantalla
    location.replace("/errorServer/?error=" + error.error);
  }
}

//segun las consignas del tp las peticiones a carrito(agregar, quitar producto) se hacen enviando el id de carrito por url, por lo que hacer una peticion para obtenerlo
async function obtener_idCarrito() {
  let resp = await fetch("/api/carrito/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  //compruebo que no hubo error en la peticion
  comprobarRespuesta(resp);

  let cart = await resp.json();
  return cart.id;
}

async function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("articulo__boton-compra")) {
    ///obtengo el producto que se muestra en la pagina
    const productoSeleccionado = e.target.parentElement;
    //obtengo el id del producto, es el numero del id
    let idProd = productoSeleccionado.getAttribute("id");

    let cartId = await obtener_idCarrito();

    let resp = await fetch("/api/carrito/" + cartId + "/productos", {
      body: JSON.stringify({ idProd: idProd }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    comprobarRespuesta(resp);
    let cartUpdated = await resp.json();

    actualicarCarrito(cartUpdated);
  }
}

async function quitarDeCarrito(e) {
  e.preventDefault();

  if (e.target.classList.contains("quitar-producto")) {
    let idProd = e.target.getAttribute("data-id");
    let idCart = await obtener_idCarrito();
    let resp = await fetch("/api/carrito/" + idCart + "/productos/" + idProd, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    comprobarRespuesta(resp);
    let cartUpdated = await resp.json();
    actualicarCarrito(cartUpdated);
  }
}

//mediante el dropdown hago un filtro de productos por categoria
async function filtrarCategoria(e) {
  e.preventDefault();
  if (e.target.classList.contains("dropdown-item")) {
    let category = e.target.text;

    let resp = await fetch("/api/productos/c/" + category, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    comprobarRespuesta(resp);

    let listadoFilt = await resp.json();

    actualicarListadoProd(listadoFilt);
  }
}

function actualicarListadoProd(prods) {
  seccionMuestrarioProd.innerHTML = "";
  prods.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = obtenerHtmlProd(element);
    seccionMuestrarioProd.appendChild(newDiv);
  });
}

function obtenerHtmlProd({ foto, nombre, precio, id }) {
  return `      
  <div class="card " style="width: 150px;"id=${id}>
        <img
          class="card-img-top img-fluid"
          src=${foto}
          alt="Card image cap"
          style="width: 140px;"
        />
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="h4">$${precio}</p>
        </div>
        <button
          type="button"
          class="btn btn-primary articulo__boton-compra"
        >Agregar al carrito</button>
      </div>
`;
}

async function crearPedido() {
  let resp = await fetch("/api/pedido/new", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  comprobarRespuesta(resp);

  carritoTabla.innerHTML = "";
}

async function cerrarSesion() {
  let resp = await fetch("/login/logout", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  comprobarRespuesta(resp);
}

async function vaciarCarrito() {
  let cartId = await obtener_idCarrito();

  resp = await fetch("/api/carrito/" + cartId + "/productos", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  comprobarRespuesta(resp);
  carritoTabla.innerHTML = "";
}

function actualicarCarrito(carrito) {
  carritoTabla.innerHTML = "";

  carrito.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = obtenerHtmlfilaTabla(element);
    carritoTabla.appendChild(row);
  });
}

function obtenerHtmlfilaTabla({ foto, nombre, precio, cantidad, id }) {
  return `      
  <td><img
  class="card-img-top img-fluid"
  src=${foto}
  alt="Card image cap"
  style="width: 70px;"
/></td>
  <td>${nombre}</td>
  <td>$${precio}</td>
  <td>${cantidad}</td>
  <td ><strong class="quitar-producto" data-id="${id}">X</strong></td>
`;
}
