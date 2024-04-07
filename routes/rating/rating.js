import express from "express";

import {
  getRatingOwner,
  getRatingUser,
  registerProviderRating,
  registerUserRating,
} from "../../controllers/rating/rating.js";

const router = express.Router();

router.post("/ratingprovider", registerProviderRating);
router.get("/mediumratingowner/:ownerid", getRatingOwner);

router.post("/ratingclient", registerUserRating);
router.get("/mediumratinguser/:userid", getRatingUser);

export default router;
