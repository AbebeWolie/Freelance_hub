import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User  from '../models/user.model';
import generateToken from "../utils/jwt.utils";
import { sendVerificationEmail } from "../utils/emailService";

export const registerUser = async (data: any, model :any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await model.create({ ...data, password: hashedPassword });
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const user:any = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken(user._id)
  return token;
  // return jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
};
