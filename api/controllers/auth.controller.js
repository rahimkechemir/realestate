import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();


export const signup = async (req, res ,next) => {
const { username, email, password } = req.body;

try {
    // Check if the user already exists
    const existingUser = await User.findOne({$or: [{ username }, { email }]});
    if (existingUser) {
        return res.status(400).json({success: false, message: "Username or email already exists" });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password:hashedPassword });
    await newUser.save();
    res.status(201).json({success: true, message: "User created successfully" });
}  catch (error) {
    next(error);
}}

export const signin = async (req, res ,next) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email });
        if(!validUser) {
            return next(errorHandler(404, ""));
        }
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(401, "Invalid password or email"));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.status(200).json({success: true, message: "User signed in successfully", token });
        res.cookie("token", token, {httpOnly: true, maxAge: 3600000});
     }  
    catch(error)
    {
        next(error);
    }
}