import { createTransport } from "nodemailer";
import { emailConfig } from "../../utils/configs/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password,
  },
});

const enviarMailRegistro = async ({ name, address, age, telephone }) => {
  const mailOptions = {
    from: "Servidor Node.js con img",
    to: emailConfig.user,
    subject: "nuevo registro",
    html: `
    <ul>
    <li>Nombre: ${name}</li>
    <li>Direccion: ${address}</li>
    <li>Edad: ${age}</li>
    <li>Telefono: ${telephone}</li>
  </ul>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

const enviarMailPedido = async ({ name, email, lista }) => {
  let strlista = "";
  lista.forEach(
    (element) =>
      (strlista =
        strlista +
        `<li>${element.nombre}, codigo ${element.codigo}, precio $${element.precio}</li>`)
  );

  strlista = "<ul>" + strlista + "</ul>";

  const mailOptions = {
    from: "Servidor Node.js con img",
    to: emailConfig.user,
    subject: `nuevo pedido de ${name}, ${email} `,
    html: strlista,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export { enviarMailPedido, enviarMailRegistro };
