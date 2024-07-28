import jwt from "jsonwebtoken";
import Users from "../Models/users.models.js";

const auth = async (req, res, next) => {
  const token = req.cookies?.Token;
  try {
    if (!token) {
      return res
        .status(401)
        .send({ result: false, message: "Authentication failed..." });
    } else {
      const { id } = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = await Users.findById(id);
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(500).send({ result: false, message: err.message });
  }
};

export default auth;
