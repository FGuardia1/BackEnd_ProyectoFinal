const socket = io.connect();
//obtengo el email con el que enviare el mensaje de ser usuario
let userEmail = document.getElementById("emailUser").innerText;
//para seber si debo o no mostrar los mensajes de sistema/respuestas debo saber si el user es un admin
let isAdmin = false;

//verifico si la respuesta que me envio el servidor es un error que ocurrio
async function comprobarRespuesta(resp) {
  if (resp.status == 500) {
    let error = await resp.json();
    //redirecciono a mostrar el error enviandolo por query que fue encodeado como un uri, para ser decodeado y mostrado en pantalla
    location.replace("/errorServer/?error=" + error.error);
  }
}

const addMessage = async (e) => {
  const message = {
    email: userEmail,
    tipo: "usuario",
    date: new Date().toLocaleString(),
    mensaje: document.querySelector("#chatMensaje").value,
  };

  socket.emit("new-message", message);

  //envio el mensaje al servidor para ser guardado en la DB
  let resp = await fetch("/api/chat/", {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  comprobarRespuesta(resp);
};

const RespondTo = async (e) => {
  //si tiene esta funcionalidad disponible es un admin y puede ver las respuestas que mando el sistema
  isAdmin = true;
  const message = {
    email: document.querySelector("#emailRespond").value,
    tipo: "sistema",
    date: new Date().toLocaleString(),
    mensaje: document.querySelector("#chatResponse").value,
  };

  socket.emit("new-response", message);
  //envio el mensaje al servidor para ser guardado en la DB
  let resp = await fetch("/api/chat/", {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  comprobarRespuesta(resp);
};

//al conectarse recibo todas los mensajes de chat
socket.on("messages", (data) => {
  renderMessages(data);
});

//recibo un nuevo mensaje
socket.on("message-push", (data) => {
  renderMessageAdd(data);
});

//recibo una nueva respuesta
socket.on("response-push", (data) => {
  //si el mensaje va dirijido a este user lo mostrara, si es admin tambien
  if (isAdmin || data.email == userEmail) {
    data.email = data.tipo;
    renderMessageAdd(data);
  }
});

const renderMessages = (data) => {
  const html = data
    .map((msg, index) => {
      if (msg.tipo == "usuario") {
        return `<div>
          <strong class="text-primary">${msg.email}</strong><span style="color:brown">[${msg.date}]</span>:
          <i style="color:green">${msg.mensaje}</i>
			</div>`;
      } else {
        if (msg.email == userEmail) {
          return `<div>
                      <strong class="text-primary">sistema</strong><span style="color:brown">[${msg.date}]</span>:
                      <i style="color:green">${msg.mensaje}</i>
                  </div>`;
        }
      }
    })
    .join(" ");
  document.querySelector("#messages").innerHTML = html;
};

const renderMessageAdd = ({ email, mensaje, date }) => {
  const html = `
  <strong class="text-primary">${email}</strong><span style="color:brown">[${date}]</span>:
  <i style="color:green">${mensaje}</i>`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};
