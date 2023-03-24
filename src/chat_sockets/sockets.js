import MessagesRepo from "../persistencia/repos/MessagesRepo.js";

const msgsRepo = MessagesRepo.getInstancia();

export const chatService = (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo usuario de chat conectado");

    //Al recibir un mensaje recojemos los datos
    socket.on("new-message", (message) => {
      //Lo enviamos a todos los usuarios (clientes)
      let { email, mensaje, date } = message;
      msgsRepo.add(message);
      io.sockets.emit("message-push", { email, mensaje, date });
    });
  });
};
