import { User } from "../../utils/models/user.js";
import bCrypt from "bcrypt";
import path from "path";
import logger from "../../utils/logger.js";
const dirname = `${process.cwd()}`;

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

//codifica la password antes de guardarla a la DB
const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const login = (req, username, password, cb) => {
  const file = req.file;
  User.findOne({ email: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      logger.info("Usuario no encontrado con email " + username);

      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      logger.info("contraseña invalida");
      return cb(null, false);
    }

    return cb(null, user);
  });
};

const register = (req, username, password, cb) => {
  const file = req.file;
  let passConf = req.body.passwordConf;
  //verifico que la contraseña/verificacion sean iguales
  if (password != passConf) {
    return cb(null, false);
  }

  User.findOne({ email: username }, function (err, user) {
    if (err) {
      logger.info("Error in SignUp: " + err.message);
      return cb(err);
    }
    if (user) {
      logger.info("usuario existe");
      return cb(null, false);
    } else {
      let path_avatar = path.join(dirname, "public", "avatar", file.filename);
      const { name, address, age, telephone, typeUser } = req.body;

      const newUser = new User();
      newUser.email = username;
      newUser.password = createHash(password);
      newUser.name = name;
      newUser.address = address;
      newUser.age = age;
      newUser.telephone = telephone;
      newUser.avatar_path = path_avatar;
      newUser.rol = typeUser;
      newUser
        .save()
        .then((datos) => cb(null, datos))
        .catch(null, false);
    }
  });
};

export { login, register };
