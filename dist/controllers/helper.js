import { con } from "../db_connection.js";
export const getAllUsers = (req, res) => {
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
export const getUsersByName = (colName, req, res) => {
    const userName = req.params.username;
    const query = `SELECT * FROM user_table WHERE ${con.escapeId(colName)} LIKE ${con.escape(`%${userName}%`)}`;
    con.query(query, (err, data) => {
        if (err) {
            return res.status(404).send("No user found");
        }
        return res.status(200).json(data);
    });
};
export const addNewUser = (req, res) => {
    const query = "INSERT INTO user_table(`username`,`email`,`password`,`blocked`) VALUES (?)";
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
export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, email, password, blocked } = req.body;
    const query = `UPDATE user_table SET username = ${con.escape(username)}, email = ${con.escape(email)}, password = ${con.escape(password)}, blocked = ${con.escape(blocked)} WHERE id = ${userId}`;
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
export const deleteUser = (req, res) => {
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
