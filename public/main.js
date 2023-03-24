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
dropdownMenu[0].addEventListener("click", seleccionarCategoria);

function seleccionarCategoria(e) {
  e.preventDefault();
  if (e.target.classList.contains("dropdown-item")) {
    console.log("seleccion es" + e.target.text);
  }
}

function crearPedido() {
  fetch("/api/pedido/new", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  carritoTabla.innerHTML = "";
}

function cerrarSesion() {
  fetch("/login/logout", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
}

async function vaciarCarrito() {
  let cart = await fetch("/api/carrito/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  cart = await cart.json();

  let response = await fetch("/api/carrito/" + cart.id + "/productos", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });

  carritoTabla.innerHTML = "";
}

async function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("articulo__boton-compra")) {
    ///obtengo el producto que se muestra en la pagina
    const productoSeleccionado = e.target.parentElement;
    //obtengo el id del producto, es el numero del id
    let idProd = productoSeleccionado.getAttribute("id");

    let idCart = await fetch("/api/carrito/", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });

    idCart = await idCart.json();

    let cartUpdated = await fetch("/api/carrito/" + idCart.id + "/productos", {
      body: JSON.stringify({ idProd: idProd }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    cartUpdated = await cartUpdated.json();

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

function obtenerHtmlfilaTabla({ foto, nombre, precio, cantidad }) {
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
`;
}

const addMessage = (e) => {
  const message = {
    email: chatEmail,
    tipo: "usuario",
    date: new Date().toLocaleString(),
    mensaje: document.querySelector("#chatMensaje").value,
  };

  socket.emit("new-message", message);
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
