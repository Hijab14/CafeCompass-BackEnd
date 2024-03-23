import express from "express";
import { addProduct } from "../controllers/ProductsController.js";

const app = express();

app.use(express.json());

const router = express.Router();

// POST /api/products
router.post("/addProduct", addProduct);

export default router;
