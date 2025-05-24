import { Router } from "express";
import { addNewUser, deleteUser, getAllUsers, getUsersByName, updateUser, } from "../controllers/helper.js";
const router = Router();
router.get("/users", async (req, res) => {
    try {
        await getAllUsers(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/getuser/:username", async (req, res) => {
    try {
        await getUsersByName("username", req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/adduser", async (req, res) => {
    try {
        await addNewUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/user/:id", async (req, res) => {
    try {
        await updateUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/user/:id", async (req, res) => {
    try {
        await deleteUser(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
