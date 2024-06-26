import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import { DeleteUser, GetAllUsers } from "../../controllers/Admin/Providers.js";

const router = express.Router();

router.get("/allproviders", GetAllUsers);
router.delete("/deleteprovider/:userId", DeleteUser);
// router.post("/accesstoken",VerifyToken)

export default router;
