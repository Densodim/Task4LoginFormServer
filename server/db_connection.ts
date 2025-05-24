import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const hostname: string = process.env.HOST || "";
const database: string = process.env.DATABASE || "";
const port: number = parseInt(process.env.PORT || "3306");
const username: string = process.env.USER || "";
const password: string = process.env.PASSWORD || "";

export const con: mysql.Connection = mysql.createConnection({
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
