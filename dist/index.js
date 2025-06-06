import express from "express";
import cors from "cors";
import { con } from "./db_connection.js";
import userRouter from "./routers/userRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Подключение к базе данных
con.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        process.exit(1);
    }
    console.log("Connected to database successfully");
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/uk", userRouter);
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
