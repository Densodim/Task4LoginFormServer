import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const hostname = process.env.HOST || "";
const database = process.env.DATABASE || "";
const port = parseInt(process.env.PORT || "3306");
const username = process.env.USER || "";
const password = process.env.PASSWORD || "";
export const con = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});
export const clearConnections = () => {
    con.query("KILL CONNECTION connection_id()", (err) => {
        if (err) {
            console.error("Error killing connection:", err);
            return;
        }
        console.log("Current connection killed");
    });
    con.end((err) => {
        if (err) {
            console.error("Error closing connection:", err);
            return;
        }
        console.log("Database connection closed");
    });
};
