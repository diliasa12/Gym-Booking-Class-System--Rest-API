import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    const { name, email, password, role, joinedClasses } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email has been registered" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      joinedClasses,
    });
    if (!user) return res.status(400).json({ message: "Failed create user!" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    res.status(201).json({
      succes: true,
      message: "User succesfully created",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email haven't register" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    res
      .status(202)
      .json({ succes: true, message: "Login Successfull", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
