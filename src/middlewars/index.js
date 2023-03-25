import { JWT_UTILS } from "../../utils/jwt-utils.js";
import { User } from "../../utils/models/user.js";

const isValidAuthToken = async (req, res, next) => {
  try {
    const { tokenCookie } = req.cookies;

    if (!tokenCookie) {
      throw new Error("Unauthorized");
    }

    const verifiedToken = JWT_UTILS.verifyToken(tokenCookie, "secret");

    if (!verifiedToken) {
      throw new Error("Unauthorized");
    }

    const user = await User.findOne({ email: verifiedToken.email });

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = user;

    next();
  } catch (error) {
    res.redirect("/login");
  }
};

export { isValidAuthToken };
