import express from "express";
import { GetAllOrders } from "../../controllers/Admin/Orders.js";
import { VerifyToken } from "../../middlewares/jwt.js";
const router = express.Router();

router.get("/allorders",VerifyToken, GetAllOrders);

export default router;
