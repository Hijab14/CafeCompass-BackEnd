import User from "../models/UsersModel.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';


const JWT_SECRET = "mhmkisgood$";
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { Email, Password } = req.body;
    try {
        let user = await User.findOne({ email:Email });
        if (!user) {
            return res.status(400).json({ success: false, errors: [{ msg: "Invalid Credentials" }] });
        }
        
        // Use bcrypt to compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(Password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ success: false, errors: [{ msg: "Invalid Credentials Password" }] });
        }
        
        const payload = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 });
        console.log(authtoken);
        res.json({ success: true, authtoken, cafeName: user.cafeName, userType: 'user' });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};


export const getAdmin = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-Password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        res.status(201).json({ message: "User successfully registered", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
};