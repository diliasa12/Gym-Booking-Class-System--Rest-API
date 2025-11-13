import { Router } from "express";
import {
  addClass,
  deleteClass,
  getClasses,
  getProfile,
} from "../controllers/user.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const routeUser = Router();
routeUser.get("/profile", authorization, roleMiddleware("user"), getProfile);
routeUser.get("/classes", authorization, roleMiddleware("user"), getClasses);
routeUser.post(
  "/book/:classId",
  authorization,
  roleMiddleware("user"),
  addClass
);
routeUser.delete(
  "/book/:classId",
  authorization,
  roleMiddleware("user"),
  deleteClass
);
export default routeUser;
