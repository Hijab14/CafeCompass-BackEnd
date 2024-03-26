import Admin from "../models/AdminsModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        const isMatch = await bcrypt.compare(Password, User.Password);
        console.log(Password);
        console.log(User.Password);
        if (!isMatch) {
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
