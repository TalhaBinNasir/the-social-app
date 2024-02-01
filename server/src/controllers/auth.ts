import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User.ts";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ Error: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ Error: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
