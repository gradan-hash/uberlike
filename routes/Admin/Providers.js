import express from "express";

import { VerifyToken } from "../../middlewares/jwt.js";
import { GetAllUsers } from "../../controllers/Admin/Providers.js";

const router = express.Router();

router.get("/allproviders", VerifyToken, GetAllUsers);

// router.post("/accesstoken",VerifyToken)

export default router;
