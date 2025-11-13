import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const routeAuth = Router();
routeAuth.post("/login", login);
routeAuth.post("/register", register);

export default routeAuth;
