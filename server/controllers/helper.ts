import { Response, Request } from "express";
import { con } from "../db_connection.js";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  blocked: boolean;
  last_login: Date;
};

export const getAllUsers = (req: Request, res: Response) => {
  const query = `SELECT * FROM user_table ORDER BY last_login DESC`;
  con.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
    return res.status(200).json({
      success: true,
      data: data.map((user: User) => ({
        ...user,
        last_login: user.last_login
          ? new Date(user.last_login).toISOString()
          : null,
      })),
    });
  });
};

export const getUsersByName = (
  username: string,
  req: Request,
  res: Response
) => {
  const userName = req.params.username;
  const query = `SELECT * FROM user_table WHERE ${con.escapeId(
    userName
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

export const updateLastLogin = async (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE user_table SET last_login = NOW() WHERE id = ?";
    con.query(query, [userId], (err) => {
      if (err) {
        console.error("Error updating last login:", err);
        reject(err);
        return;
      }
      resolve();
    });
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

    con.query(query, async (err, data) => {
      if (err) {
        console.error("Database error:", err);
        reject(err);
        return;
      }

      const user = data[0] || null;
      if (user) {
        try {
          await updateLastLogin(user.id);
        } catch (error) {
          console.error("Error updating last login:", error);
        }
      }

      resolve(user);
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
    console.log("Fetching user with ID:", id);
    const query = "SELECT * FROM user_table WHERE id = ?";
    console.log("Query:", query);
    con.query(query, [id], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        reject(new Error("Failed to fetch user"));
        return;
      }

      console.log("Query result:", data);

      if (!data || data.length === 0) {
        console.log("No user found");
        resolve(null);
        return;
      }

      console.log("User found:", data[0]);
      resolve(data[0]);
    });
  });
};
