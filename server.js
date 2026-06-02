import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import mongoseConnect from "./src/config/db.js";
import routeAuth from "./src/routes/auth.routes.js";
import routeUser from "./src/routes/user.routes.js";
import routeClass from "./src/routes/class.routes.js";
import errorHandler from "./src/middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Baca JSON langsung, tidak butuh js-yaml
const swaggerDoc = JSON.parse(
  readFileSync(join(__dirname, "swagger.json"), "utf8"),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js",
    ],
  }),
);

mongoseConnect();

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Hello Folks!!!" });
});

app.use("/api/auth", routeAuth);
app.use("/api/classes", routeClass);
app.use("/api/users", routeUser);
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
  });
}
