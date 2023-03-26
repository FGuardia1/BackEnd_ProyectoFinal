import { twilioConfig } from "../../utils/configs/config.js";
import twilio from "twilio";

const clientTwilio = twilio(twilioConfig.auth, twilioConfig.pass);

export const sendmsj = async (telephone) => {
  const msjData = {
    body: "Pedido recibido, en proceso",
    from: twilioConfig.cel,
    to: telephone,
  };
  try {
    const msj = await clientTwilio.messages.create(msjData);
  } catch (e) {
    console.log({ e });
  }
};

export const sendwsp = async ({ name, email }) => {
  const msjData = {
    body: `nuevo pedido de ${name}, ${email} `,
    from: "whatsapp:" + twilioConfig.celwsp,
    to: "whatsapp:" + twilioConfig.celAdmin,
  };
  try {
    const msj = await clientTwilio.messages.create(msjData);
  } catch (e) {
    console.log({ e });
  }
};
