import MessagesRepo from "../persistencia/repos/MessagesRepo.js";

const msgsRepo = MessagesRepo.getInstancia();

export const chatService = (io) => {
  io.on("connection", async (socket) => {
    //al conectarse un usuario  envia todos los mensajes del chat para ser visualizados
    socket.emit("messages", await msgsRepo.getAll());
    //Al recibir un mensaje de un usuario recojemos los datos
    socket.on("new-message", (message) => {
      //Lo enviamos a todos los usuarios (clientes)
      let { email, mensaje, date } = message;
      io.sockets.emit("message-push", { email, mensaje, date });
    });

    //al detectar una respuesta de un mod/admin lo envia como una respuesta
    socket.on("new-response", (message) => {
      //Lo enviamos a todos los usuarios (clientes) y solo el usuario al que va dirigido lo vera
      let { email, mensaje, date, tipo } = message;
      io.sockets.emit("response-push", { email, mensaje, date, tipo });
    });
  });
};
