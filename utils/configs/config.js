import { config } from "dotenv";
config();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV == "DEV") {
  configDotenv = { path: path.join(__dirname, "..", "..", "development.env") };
  configDotenv.override = true;
  config(configDotenv);
}
const env = process.env;

const emailConfig = {
  name: env.GMAIL_NAME,
  user: env.GMAIL_USER,
  password: env.GMAIL_PASS,
};

const twilioConfig = {
  auth: env.TWILIO_AUTH,
  pass: env.TWILIO_PASS,
  cel: env.TWILIO_CEL,
  celAdmin: env.TWILIO_CEL_ADMIN,
  celwsp: env.TWILIO_CEL_WSP,
};

const proyectConfig = {
  URL_MONGO_ATLAS: env.URL_MONGO_ATLAS,
  PORT: env.PORT,
  PERSISTENCIA: env.PERSISTENCIA,
  SERVICE_EXT: env.SERVICE_EXT,
};

export { emailConfig, twilioConfig, proyectConfig };
