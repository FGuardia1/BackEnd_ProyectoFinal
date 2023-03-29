const socket = io.connect();
let userEmail = document.getElementById("emailUser").innerText;

async function comprobarRespuesta(resp) {
  if (resp.status == 500) {
    let error = await resp.json();
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
  const message = {
    email: document.querySelector("#emailRespond").value,
    tipo: "sistema",
    date: new Date().toLocaleString(),
    mensaje: document.querySelector("#chatResponse").value,
  };

  socket.emit("new-response", message);

  let resp = await fetch("/api/chat/", {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  comprobarRespuesta(resp);
};

socket.on("message-push", (data) => {
  renderMessageAdd(data);
});

socket.on("response-push", (data) => {
  if (data.email == userEmail) {
    data.email = data.tipo;
    renderMessageAdd(data);
  }
});

const renderMessageAdd = ({ email, mensaje, date }) => {
  const html = `
  <strong class="text-primary">${email}</strong><span style="color:brown">[${date}]</span>:
  <i style="color:green">${mensaje}</i>`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};
