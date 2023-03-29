import MessagesRepo from "../persistencia/repos/MessagesRepo.js";

const msgsRepo = MessagesRepo.getInstancia();

export const chatService = (io) => {
  io.on("connection", async (socket) => {
    //Al recibir un mensaje recojemos los datos

    socket.emit("messages", await msgsRepo.getAll());

    socket.on("new-message", (message) => {
      //Lo enviamos a todos los usuarios (clientes)
      let { email, mensaje, date } = message;

      io.sockets.emit("message-push", { email, mensaje, date });
    });

    socket.on("new-response", (message) => {
      //Lo enviamos a todos los usuarios (clientes) y solo el usuario al que va dirigido lo vera
      let { email, mensaje, date, tipo } = message;

      io.sockets.emit("response-push", { email, mensaje, date, tipo });
    });
  });
};
