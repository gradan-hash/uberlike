import express from "express";
import {
  createOrder,
  GetAllOrder,
  UpdateCreateOrder,
} from "../../controllers/users/Order.js";
const router = express.Router();

router.post("/postOrder", createOrder);
router.post("/updateOrder", UpdateCreateOrder);
router.get("/getpickup/:userId", GetAllOrder);

export default router;
