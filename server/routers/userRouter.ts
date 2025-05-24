import { Request, Response, Router } from "express";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUsersByName,
  updateUser,
  checkCredentials,
} from "../controllers/helper.js";
import { generateToken } from "../controllers/jwt.js";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await checkCredentials(req.body.username, req.body.password);
    if (user) {
      const token = generateToken({ id: user.id });
      res.status(201).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getuser/:username", async (req: Request, res: Response) => {
  try {
    await getUsersByName("username", req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/adduser", async (req: Request, res: Response) => {
  try {
    await addNewUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user/:id", async (req: Request, res: Response) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
