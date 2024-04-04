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

export const Charts = async (req, res, next) => {
  try {
    const allOrders = await Order.find({});

    // Initialize an array to store chart data
    const chartData = [];

    // Iterate over each order
    allOrders.forEach((order) => {
      // Get the day the order was updated
      const day = new Date(order.updatedAt).toLocaleDateString();

      // Push the order's amountPaid and day to the chartData array
      chartData.push({
        day,
        amountPaid: order.amountPaid,
      });
    });

    res.status(200).json(chartData);
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    next(error);
  }
};
