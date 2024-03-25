import Rides from "../../models/providers/Rides";
import Provider from "../../models/providers/Providers";
import createError from "../../utils/createError";

export const createProducts = async (req, res, next) => {
  // console.log(req.body);
  const newItems = new Rides({
    ...req.body,
  });

  try {
    const savedItems = await newItems.save();
    res.status(200).json(savedItems);
  } catch (err) {
    next(err);
  }
};

export const singleProducts = async (req, res, next) => {
  try {
    const items = await Rides.findById(req.params.id);

    // Assuming items is not null and has a valid ProviderId
    const providerid = items.OwnerId;
    const providerdetails = await Provider.findById(providerid);

    // Check if items exists after fetching it
    if (!items) return next(createError("Product not found", 404));

    // Combining items and providerdetails into a single response object
    const response = {
      items,
      providerdetails,
    };
    // console.log(response);
    res.status(200).send(response); // Sending the combined object as response
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    // Get all products
    let items = await Rides.find();

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const deleteProducts = async (req, res, next) => {
  try {
    const items = await Rides.findById(req.params.id);

    if (!items) return next(createError(403, "sorry"));

    await items.findByIdAndDelete(req.params.id);
    res.status(200).send("Items has been deleted");
  } catch (err) {
    next(err);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await Rides.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!item) return next(createError(404, "item not found"));

    res.status(200).json({ message: "item has been updated", item });
  } catch (err) {
    next(err);
  }
};
