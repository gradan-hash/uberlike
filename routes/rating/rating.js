import express from "express";

import {
  getRatingOwner,
  getRatingUser,
  registerProviderRating,
  registerUserRating,
} from "../../controllers/rating/rating.js";

const router = express.Router();

router.post("/ratingprovider", registerProviderRating);
router.get("/mediumratingowner", getRatingOwner);

router.post("/ratingclient", registerUserRating);
router.get("/mediumratingowner", getRatingUser);

export default router;
