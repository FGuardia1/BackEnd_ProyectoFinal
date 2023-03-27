const socket = io.connect();
let chatEmail = document.getElementById("emailUser").innerText;
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

async function obtener_idCarrito() {
  let resp = await fetch("/api/carrito/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  comprobarRespuesta(resp);

  let cart = await resp.json();
  return cart.id;
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
          <p class="h4">${precio}</p>
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
  let resp = await fetch("/api/carrito/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  comprobarRespuesta(resp);
  let cart = await resp.json();

  resp = await fetch("/api/carrito/" + cart.id + "/productos", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  comprobarRespuesta(resp);
  carritoTabla.innerHTML = "";
}

async function comprobarRespuesta(resp) {
  if (resp.status == 500) {
    let error = await resp.json();
    location.replace("/errorServer/?error=" + error.error);
  }
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

const addMessage = async (e) => {
  const message = {
    email: chatEmail,
    tipo: "usuario",
    date: new Date().toLocaleString(),
    mensaje: document.querySelector("#chatMensaje").value,
  };

  socket.emit("new-message", message);

  let resp = await fetch("/api/chat/", {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  comprobarRespuesta(resp);
  return false;
};

socket.on("message-push", (data) => {
  renderMessageAdd(data);
});

const renderMessageAdd = ({ email, mensaje, date }) => {
  const html = `
  <strong class="text-primary">${email}</strong><span style="color:brown">[${date}]</span>:
  <i style="color:green">${mensaje}</i>`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};
