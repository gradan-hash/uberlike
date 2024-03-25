import express from "express";
import {
  createOrder,
  UpdateCreateOrder,
} from "../../controllers/users/Order.js";
const router = express.Router();

router.post("/postOrder", createOrder);
router.post("/updateOrder", UpdateCreateOrder);

export default router;
