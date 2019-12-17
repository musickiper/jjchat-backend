import jwt from "jsonwebtoken";

export const generateToken = username =>
  jwt.sign({ username }, process.env.JWT_SECRET);
