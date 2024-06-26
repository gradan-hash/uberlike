import user from "../../models/clients/Users.js";
import Providers from "../../models/providers/Providers.js";
import createError from "../../utils/createError.js";
import Admin from "../../models/admin/Admin.js";

export const GetAllUsers = async (req, res, next) => {
  try {
    const Providerdetails = await Providers.find({});
    if (!Providerdetails) return "No information";

    res.status(200).send(Providerdetails);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const DeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming you're passing the user ID in the URL
    console.log(userId);
    const deletedUser = await Providers.findByIdAndDelete(userId);
    if (!deletedUser) throw createError(404, "User not found");

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming you're passing the user ID in the URL
    const updates = req.body; // All updates are expected to be in the request body
    const updatedUser = await Providers.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) throw createError(404, "User not found");

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
