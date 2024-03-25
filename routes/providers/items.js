import express from "express";
import {
  createProducts,
  getProducts,
  singleProducts,
} from "../../controllers/providers/items.js";

import { VerifyToken } from "../../middlewares/jwt.js";

const router = express.Router();

router.post("/uploadride", createProducts);
router.get("/getproducts", getProducts);
router.get("/singleproduct/:id", VerifyToken, singleProducts);

export default router;
