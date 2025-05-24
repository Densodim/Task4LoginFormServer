import express from "express";
import cors from "cors";
import { con } from "./db_connection.js";
import userRouter from "./routers/userRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

con.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");
});

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/uk", userRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
