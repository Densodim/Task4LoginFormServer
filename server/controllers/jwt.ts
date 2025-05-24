import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "1234";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
