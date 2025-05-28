import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUsersByName,
  updateUser,
  checkCredentials,
  getUserById,
} from "../controllers/helper.js";
import { generateToken } from "../controllers/jwt.js";
import { authMiddleware } from "../controllers/authMiddleware.js";

const router = Router() as Router;

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await checkCredentials(req.body.username, req.body.password);

    if (user) {
      const token = generateToken({ id: user.id });
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({
        token,
        user: userWithoutPassword,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
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

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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
