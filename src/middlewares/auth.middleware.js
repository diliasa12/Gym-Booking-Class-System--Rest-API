import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorization = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(403).json({ message: "Access forbidden" });
    token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id)
      .select("-password")
      .populate("joinedClasses");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
