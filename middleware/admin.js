import { getToken } from "next-auth/jwt";
import User from "../models/User";
import { connectDb, disconnectDb } from "../utils/db";


export default async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  connectDb();
  let user = await User.findById(token.sub);
  disconnectDb();
  if (user.role == "admin") {
    next();
  } else {
    res.status(401).json({ message: "Access denied, Admin resourses." });
  }
};
