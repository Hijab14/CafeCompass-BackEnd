import Admin from "../models/AdminsModel.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = "mhmkisgood$";

export const loginAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { Email, Password } = req.body;
    try {
        let User = await Admin.findOne({ Email });
        if (!User) {
            return res.status(400).json({ success: false, errors: [{ msg: Email }] });
        }
        
        // Compare plaintext passwords directly
        if (Password !== User.Password) {
            return res.status(400).json({ success: false, errors: [{ msg: "Invalid Credentials Password" }] });
        }
        
        const payload = {
            User: {
                id: User.id
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 });
        console.log(authtoken);
        res.json({ success: true, authtoken });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

export const getAdmin = async (req, res) => {
    try {
        const userId = req.user.id;
        const User = await Admin.findById(userId).select("-Password");
        res.send(User);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export const updatePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Email, newPassword } = req.body;
    try {
        let User = await Admin.findOne({ Email });
        if (!User) {
            return res.status(400).json({ success: false, errors: [{ msg: "User not found" }] });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in database
        User.Password = hashedPassword;
        await User.save();

        res.json({ success: true, msg: "Password updated successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};