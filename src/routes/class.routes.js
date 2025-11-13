import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClass,
  getClass,
  updateClass,
} from "../controllers/class.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const routeClass = Router();

routeClass.post("/", authorization, roleMiddleware("admin"), createClass);
routeClass.get("/", authorization, roleMiddleware("admin"), getAllClass);
routeClass.get("/:id", authorization, roleMiddleware("admin"), getClass);
routeClass.patch("/:id", authorization, roleMiddleware("admin"), updateClass);
routeClass.delete("/:id", authorization, roleMiddleware("admin"), deleteClass);
export default routeClass;
