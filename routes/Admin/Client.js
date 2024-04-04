import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import { DeleteUser, GetAllUsers } from "../../controllers/Admin/Client.js";

const router = express.Router();

router.get("/allusers", VerifyToken, GetAllUsers);
router.get("/delete/:userId", VerifyToken, DeleteUser);

// router.post("/accesstoken",VerifyToken)

export default router;
