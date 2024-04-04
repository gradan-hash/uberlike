import express from "express";
import { Charts, GetAllOrders } from "../../controllers/Admin/Orders.js";
import { VerifyToken } from "../../middlewares/jwt.js";
const router = express.Router();

router.get("/allordersadmin", GetAllOrders);
router.get("/charts", Charts);

export default router;
