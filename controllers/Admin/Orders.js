import Order from "../../models/clients/Order.js";
import createError from "../../utils/createError.js";

export const GetAllOrders = async (req, res, next) => {
  try {
    const Allorders = await Order.find({});
    if (!Allorders) return "No order found";
    res.status(200).send(Allorders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
