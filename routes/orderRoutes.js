import express from "express";
import { addOrder } from "../controllers/OrdersController.js";
const app = express();

app.use(express.json());

const router = express.Router();

router.post('/addOrder', addOrder);

export default router;
