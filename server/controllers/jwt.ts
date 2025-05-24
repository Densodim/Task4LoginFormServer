import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "1234";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

export const getUserIdByToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
};
