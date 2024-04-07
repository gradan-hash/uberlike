import Providers from "../../models/providers/Providers.js";
import user from "../../models/clients/Users.js"; 
import Rating from "../../models/rating/Rating.js";
import createError from "../../utils/createError.js";

export const registerProviderRating = async (req, res, next) => {
  try {
    const { userid, providerid, rating, review } = req.body;
    if (!userid || !providerid || !rating || !review) {
      return res.status(400).send({ message: "All details needed" });
    }

    // Creating a new rating
    const newRating = new Rating({
      userid,
      providerid,
      rating,
      review,
    });

    // Save the new rating to the database
    await newRating.save();

    // Calculate the total rating
    const ratings = await Rating.find({ providerid: providerid });
    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });
    const averageRating = totalRating / ratings.length;

    // Update the provider's rating in the Provider table
    await Providers.findByIdAndUpdate(providerid, {
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
  try {
    const { userid, providerid, rating, review } = req.body;
    if (!userid || !providerid || !rating || !review) {
      return res.status(400).send({ message: "All details needed" });
    }

    // Creating a new rating
    const newRating = new Rating({
      userid,
      providerid,
      rating,
      review,
    });

    // Save the new rating to the database
    await newRating.save();

    // Calculate the total rating
    const ratings = await Rating.find({ providerid: providerid });
    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });
    const averageRating = totalRating / ratings.length;

    // Update the provider's rating in the Provider table
    await user.findByIdAndUpdate(providerid, {
      $set: { rating: averageRating },
    });

    res.status(200).send("success");
  } catch (err) {
    console.error(err);
    next(createError(500, "Registration failed!"));
  }
};
