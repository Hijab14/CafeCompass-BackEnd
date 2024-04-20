import express from "express";
import { addProduct, getProductsCategory, getProductsCafe, getProductsLocation, getProductsName, deleteProductById , updateProduct, getAllProducts} from "../controllers/ProductsController.js";

const app = express();

app.use(express.json());

const router = express.Router();

// POST /api/products
router.post("/addProduct", addProduct);
router.get("/getCategory", getProductsCategory);
router.get("/getCafe", getProductsCafe);
router.get("/getLocation", getProductsLocation);
router.get("/getName", getProductsName);
router.delete('/delete', deleteProductById);
router.put("/update", updateProduct);
router.get("/getAll", getAllProducts);
export default router;
