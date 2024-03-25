import express from "express";
import { addProduct, getProductsCategory, getProductsCafe, getProductsLocation, getProductsName, deleteProductById , updateProduct} from "../controllers/ProductsController.js";

const app = express();

app.use(express.json());

const router = express.Router();

// POST /api/products
router.post("/addProduct", addProduct);
router.get("/getCategory", getProductsCategory);
router.get("/getCafe", getProductsCafe);
router.get("/getLocation", getProductsLocation);
router.get("/getName", getProductsName);
router.delete('/:productId', deleteProductById);
router.put("/update", updateProduct);
export default router;
