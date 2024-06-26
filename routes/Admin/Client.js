import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import { DeleteUser, GetAllUsers } from "../../controllers/Admin/Client.js";

const router = express.Router();

router.get("/allusers", GetAllUsers);
router.delete("/delete/:userId", DeleteUser);

// router.post("/accesstoken",VerifyToken)

export default router;
