import express from "express";
import {
  register,
  login,
  logout,
  complains,
} from "../../controllers/users/Auth.js";
import { VerifyToken } from "../../middlewares/jwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/report", complains);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/accesstoken",VerifyToken)

export default router;
