import Providers from "../../models/providers/Providers.js";
import user from "../../models/clients/Users.js";
import Rating from "../../models/rating/Rating.js";
import createError from "../../utils/createError.js";
import Rides from "../../models/providers/Rides.js";

export const registerProviderRating = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userid, ownerId, rating, review } = req.body;
    if (!userid || !ownerId || !rating || !review) {
      return res.status(400).send({ message: "All details needed" });
    }

    // Creating a new rating
    const newRating = new Rating({
      userid,
      ownerId,
      rating,
      review,
    });

    // Save the new rating to the database
    await newRating.save();

    // Calculate the total rating
    const ratings = await Rating.find({ ownerId: ownerId });
    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });
    const averageRating = totalRating / ratings.length;

    // Update the provider's rating in the Provider table
    await Providers.findByIdAndUpdate(ownerId, {
      $set: { rating: averageRating },
    });

    res.status(200).send("success");
  } catch (err) {
    console.error(err);
    next(createError(500, "Registration failed!"));
  }
};

//from the provider
export const registerUserRating = async (req, res, next) => {
  console.log(req.body);

  try {
    const { userid, ownerId, rating, review } = req.body;
    if (!userid || !ownerId || !rating || !review) {
      return res.status(400).send({ message: "All details needed" });
    }

    // Creating a new rating
    const newRating = new Rating({
      userid,
      ownerId,
      rating,
      review,
    });

    // Save the new rating to the database
    await newRating.save();

    // Calculate the total rating
    const ratings = await Rating.find({ userid: userid });
    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });
    const averageRating = totalRating / ratings.length;

    // Update the provider's rating in the Provider table
    await user.findByIdAndUpdate(userid, {
      $set: { rating: averageRating },
    });

    res.status(200).send("success");
  } catch (err) {
    console.error(err);
    next(createError(500, "Registration failed!"));
  }
};

export const getRatingUser = async (req, res, next) => {
  try {
    // Extract ownerId from request parameters
    const { userid } = req.params;

    // Find ratings associated with the provided userid
    const ratings = await user.find({ userid });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .send({ message: "No ratings found for this userid" });
    }

    // Respond with the average rating
    res.status(200).send(ratings);
  } catch (err) {
    console.error(err);
    next(createError(500, "Failed to fetch rating"));
  }
};

export const getRatingOwner = async (req, res, next) => {
  try {
    // Extract ownerId from request parameters
    const { ownerid } = req.params;

    // Find ratings associated with the provided ownerid
    const ratings = await Providers.find({ ownerid });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .send({ message: "No ratings found for this ownerid" });
    }

    // Respond with the average rating
    res.status(200).send(ratings);
  } catch (err) {
    console.error(err);
    next(createError(500, "Failed to fetch rating"));
  }
};
