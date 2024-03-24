import express from "express";
import {
  register,
  login,
  logout,
} from "../../controllers/providers/Authproviders.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/accesstoken",VerifyToken)

export default router;
