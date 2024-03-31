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
  const orderId = req.body.orderid;
  const { amountPaid } = req.body;
  const { price } = req.body;
  try {
    // Find the order by ID and update its details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        amountPaid: amountPaid,
        price: price,
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

// update after payment
export const UpdateCreateOrderPaid = async (req, res, next) => {
  console.log(req.body);
  const orderId = req.body.orderid;
  const userId = req.body.userid;
  const amountPaid = req.body.amountPaid;
  try {
    // Find the order by ID and update its details
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId, // Find by order ID
        userId: userId, // ... and matching user ID
        status: "Confirmed", // ... and with status "Confirmed"
      },
      {
        amountPaid: amountPaid,
      },
      { new: true }
    );
    if (!updatedOrder) {
      throw createError(404, "Order not found");
    }
    console.log("updatedOrder", updatedOrder);
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
  // console.log(req.params.providerId);
  // const providerId = req.params.providerId;
  try {
    const orders = await Order.find({
      userid: req.params.userId,
      status: { $in: ["Confirmed", "Unconfirmed"] },
    });
    if (!orders) return "No information";
    // console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Get all orders for a specific provider by providerId
export const GetAllcompletedOrder = async (req, res, next) => {
  // console.log(req.params.providerId);
  // const providerId = req.params.providerId;
  try {
    const orders = await Order.find({
      userid: req.params.userId,
      status: "Completed",
    });
    if (!orders) return "No information";
    // console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

export const GetAllOrderConfirmed = async (req, res, next) => {
  // console.log(req.params);
  // const providerId = req.params.providerId;
  try {
    const orders = await Order.find({
      _id: req.params.id,
      status: "Confirmed",
    });
    if (!orders) return "No information";
    // console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    next(error); // Pass error to error handling middleware
  }
};

// Update an existing order
export const UpdateOrder = async (req, res, next) => {
  const { orderId } = req.params; // Correctly extracting orderId from req.params
  console.log(req.body);

  try {
    // Make sure the update is applied correctly by specifying the orderId
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
