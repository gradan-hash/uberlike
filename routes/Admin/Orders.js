import express from "express";
import { GetAllOrders } from "../../controllers/Admin/Orders.js";
import { VerifyToken } from "../../middlewares/jwt.js";
const router = express.Router();

router.get("/allordersadmin", GetAllOrders);

export default router;
