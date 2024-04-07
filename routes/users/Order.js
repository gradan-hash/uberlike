import express from "express";
import {
  createOrder,
  GetAllcompletedOrder,
  GetAllOrder,
  GetAllOrderConfirmed,
  UpdateCreateOrder,
  UpdateCreateOrderPaid,
  UpdateOrder,
} from "../../controllers/users/Order.js";
const router = express.Router();

router.post("/postOrder", createOrder);
router.post("/updateOrder", UpdateCreateOrder);
router.get("/getpickup/:userId", GetAllOrder);
router.get("/getcompleted/:userId", GetAllcompletedOrder);
router.get("/getpickupconfirmed/:id", GetAllOrderConfirmed);
router.post("/updatefinishorder", UpdateCreateOrderPaid);
router.post("/updaterating", UpdateOrder);

export default router;
