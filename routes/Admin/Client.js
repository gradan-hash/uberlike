import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import { GetAllUsers } from "../../controllers/Admin/Client.js";

const router = express.Router();

router.get("/allusers", VerifyToken, GetAllUsers);

// router.post("/accesstoken",VerifyToken)

export default router;
