import { User } from "../../utils/models/user.js";
import bCrypt from "bcrypt";
import path from "path";
import logger from "../../utils/logger.js";
const dirname = `${process.cwd()}`;

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};
const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const login = (req, username, password, cb) => {
  const file = req.file;
  User.findOne({ email: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      logger.info("User Not Found with email " + username);

      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      logger.info("Invalid Password");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

const register = (req, username, password, cb) => {
  const file = req.file;
  let passConf = req.body.passwordConf;
  if (password != passConf) {
    return cb(null, false);
  }

  User.findOne({ email: username }, function (err, user) {
    if (err) {
      logger.info("Error in SignUp: " + err.message);

      return cb(err);
    }
    if (user) {
      logger.info("User already exists");
      return cb(null, false);
    } else {
      let path_avatar = path.join(dirname, "public", "avatar", file.filename);
      const { name, address, age, telephone } = req.body;
      const newUser = new User();
      newUser.email = username;
      newUser.password = createHash(password);
      newUser.name = name;
      newUser.address = address;
      newUser.age = age;
      newUser.telephone = telephone;
      newUser.avatar_path = path_avatar;
      newUser
        .save()
        .then((datos) => cb(null, datos))
        .catch(null, false);
    }
  });
};

export { login, register };
