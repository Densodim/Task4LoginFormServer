import { getUserIdByToken } from "./jwt.js";
import { getUserById } from "./helper.js";
export const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: "No authorization header" });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = await getUserIdByToken(token);
    if (!userId) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    const user = await getUserById(Number(userId));
    if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
    }
    req.user = user;
    next();
};
