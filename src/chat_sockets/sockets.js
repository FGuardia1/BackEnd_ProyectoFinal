export const chatService = (io) => {
  io.on("connection", (socket) => {
    //Al recibir un mensaje recojemos los datos
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
