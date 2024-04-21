import express from "express";
import { body } from "express-validator";
import { loginAdmin, getAdmin, updatePassword } from "../controllers/AdminsController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/loginAdmin", [
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password cannot be blank').exists()
], loginAdmin);

router.post("/getAdmin", fetchUser, getAdmin);

router.put("/updatePassword", fetchUser, updatePassword);

export default router;
