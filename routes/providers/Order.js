import express from "express";
import { GetAllOrder } from "../../controllers/providers/Order.js";
const router = express.Router();

router.get("/getpickup/:providerId", GetAllOrder);

export default router;
