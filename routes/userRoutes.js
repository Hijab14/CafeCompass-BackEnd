import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/UsersController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/loginUser", [
], loginUser);
router.post('/register', registerUser);
// router.post("/getAdmin", fetchUser, getAdmin);

export default router;