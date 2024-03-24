import Provider from "../../models/providers/Providers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    console.log("body", req.body);
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newProvider = new Provider({
      // ...req.body,
      password: hash,
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
    });
    console.log("newuser", newUser);
    await newProvider.save();
    res.status(200).send("success");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // Attempt to find the user by email
    const ProviderL = await Provider.findOne({ email: req.body.email });

    // If no user is found, return a 404 error
    if (!ProviderL) return next(createError(404, "Provider not found"));

    // Check if the provided password matches the stored hash
    const isCorrect = bcrypt.compareSync(req.body.password, ProviderL.password);
    if (!isCorrect) return next(createError(400, "wrong password or email"));

    // Generate a JWT token for the user
    const token = jwt.sign({ id: ProviderL._id }, process.env.JWT_KEY);

    // Exclude the password from the user object to be sent back
    const { password, ...info } = ProviderL._doc;

    // Send the token in a cookie and the user info in the response body
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ msg: "login success", ...info });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
