import express from "express";
import {
  createOrder,
  GetAllOrder,
  GetAllOrderConfirmed,
  UpdateCreateOrder,
  UpdateCreateOrderPaid,
} from "../../controllers/users/Order.js";
const router = express.Router();

router.post("/postOrder", createOrder);
router.post("/updateOrder", UpdateCreateOrder);
router.get("/getpickup/:userId", GetAllOrder);
router.get("/getpickupconfirmed/:userId", GetAllOrderConfirmed);
router.post("/updatefinishorder", UpdateCreateOrderPaid);

export default router;
