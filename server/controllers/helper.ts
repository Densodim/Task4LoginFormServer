import { Response, Request } from "express";
import { con } from "../db_connection.js";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  blocked: boolean;
};

export const getAllUsers = (req: Request, res: Response) => {
  const query = `SELECT * FROM user_table;`;
  con.query(query, (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err.sqlMessage,
      });
    }
    return res.status(200).json(data);
  });
};

export const getUsersByName = (
  colName: string,
  req: Request,
  res: Response
) => {
  const userName = req.params.username;
  const query = `SELECT * FROM user_table WHERE ${con.escapeId(
    colName
  )} LIKE ${con.escape(`%${userName}%`)}`;
  con.query(query, (err, data) => {
    if (err) {
      return res.status(404).send("No user found");
    }
    return res.status(200).json(data);
  });
};

export const addNewUser = (req: Request, res: Response) => {
  const query =
    "INSERT INTO user_table(`username`,`email`,`password`,`blocked`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.blocked,
  ];
  con.query(query, [values], (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err.sqlMessage,
      });
    }
    return res.status(200).json(data);
  });
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, email, password, blocked } = req.body;
  const query = `UPDATE user_table SET username = ${con.escape(
    username
  )}, email = ${con.escape(email)}, password = ${con.escape(
    password
  )}, blocked = ${con.escape(blocked)} WHERE id = ${userId}`;
  con.query(query, (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err.sqlMessage,
      });
    }
    return res.status(200).json(data);
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const query = `DELETE from user_table WHERE id = ${userId}`;
  con.query(query, (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err.sqlMessage,
      });
    }
    return res.status(200).json(data);
  });
};

export const checkCredentials = async (
  username: string,
  password: string
): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user_table WHERE username = ${con.escape(
      username
    )} AND password = ${con.escape(password)}`;
    //  console.log("Login attempt:", { username, query });
    con.query(query, (err, data) => {
      if (err) {
        //   console.error("Database error:", err);
        reject(err);
      }
      // console.log("Query result:", data);
      resolve(data[0] || null);
    });
  });
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user_table WHERE username = ${con.escape(
      username
    )}`;
    con.query(query, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[0] || null);
    });
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user_table WHERE id = ${con.escape(id)}`;
    con.query(query, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[0] || null);
    });
  });
};
