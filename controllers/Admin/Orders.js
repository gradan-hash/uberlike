import Order from "../../models/clients/Order.js";

export const GetAllOrders = async (req, res, next) => {
  try {
    const Allorders = await Order.find({});
    if (!Allorders) throw createError(404, "No orders");
    return res.status(200).send({ Allorders });
  } catch (error) {
    next(error);
  }
};
