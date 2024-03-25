import Order from "../../models/clients/Order.js";
import createError from "../../utils/createError.js";
import Providers from "../../models/providers/Providers.js";
import Users from "../../models/clients/Users.js";
import Rides from "../../models/providers/Rides.js";

// Create a new order
export const createOrder = async (req, res, next) => {
  console.log(req.body);
  const newOrder = new Order({
    ...req.body,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    console.log(error);
    next(error); // Pass error to error handling middleware
  }
};

// Update an existing order
export const UpdateCreateOrder = async (req, res, next) => {
  const orderId = req.params.orderid;
  const { amountPaid, price } = req.body;
  try {
    // Find the order by ID and update its details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        amountPaid, // Update amountPaid field
        price, // Update price field
      },
      { new: true }
    );
    if (!updatedOrder) {
      throw createError(404, "Order not found");
    }
    res.status(200).send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Get a single order by ID
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw createError(404, "Order not found");
    }
    res.status(200).send(order);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Get all orders for a specific provider by providerId
export const GetAllOrder = async (req, res, next) => {
  const providerId = req.params.providerId;
  try {
    const orders = await Order.find({ ownerId: providerId });
    res.status(200).send(orders);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Update an existing order
export const UpdateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      throw createError(404, "Order not found");
    }
    res.status(200).send(updatedOrder);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};
