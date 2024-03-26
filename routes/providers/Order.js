import express from "express";
import { GetAllOrder, UpdateOrder } from "../../controllers/providers/Order.js";
const router = express.Router();

router.get("/getpickup/:providerId", GetAllOrder);
router.post("/updatestatus/:orderId", UpdateOrder);

export default router;
