import Complains from "../../models/Complains/Complains.js";
import Order from "../../models/clients/Order.js";
import createError from "../../utils/createError.js";

export const GetAllOrders = async (req, res, next) => {
  try {
    const Allorders = await Order.find({ status: "Completed" });

    if (Allorders.length === 0) {
      return res.status(404).send("No completed orders found");
    }

    res.status(200).send(Allorders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const complains = async (req, res, next) => {
  try {
    const Allorders = await Complains.find({});

    if (Allorders.length === 0) {
      return res.status(404).send("No completed orders found");
    }

    res.status(200).send(Allorders);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const Charts = async (req, res, next) => {
  try {
    const allOrders = await Order.find({ status: "Completed" });

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
