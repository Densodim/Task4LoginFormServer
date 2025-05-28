import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const hostname = process.env.HOST || "";
const database = process.env.DATABASE || "";
const port = parseInt(process.env.PORT || "3306");
const username = process.env.USER || "";
const password = process.env.PASSWORD || "";
if (!hostname || !database || !username || !password) {
    console.error("Missing database configuration. Please check your .env file");
    process.exit(1);
}
export const con = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});
con.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to database...");
        con.connect();
    }
    else {
        throw err;
    }
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
