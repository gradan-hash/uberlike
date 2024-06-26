import express from "express";
import {
  CompleteOrder,
  GetAllCompletedOrder,
  GetAllOrder,
  GetAllOrderConfirmed,
  UpdateOrder,
} from "../../controllers/providers/Order.js";
const router = express.Router();

router.get("/getpickup/:providerId", GetAllOrder);
router.get("/getcompleted/:providerId", GetAllCompletedOrder);
router.post("/updatestatus/:orderId", UpdateOrder);
router.get("/getpickupconfirmed/:id", GetAllOrderConfirmed);
router.post("/completeorder/:orderId", CompleteOrder);

export default router;
