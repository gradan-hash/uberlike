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
  try {
    // Find the order by ID and update its details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        amountPaid, // Update amountPaid field
        // Update price field
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
  // console.log(req.params.providerId);
  // const providerId = req.params.providerId;
  try {
    const orders = await Order.find({
      ownerId: req.params.providerId,
      status: "Uncornfirmed",
    });
    if (!orders) return "No information";
    // console.log(orders);

    res.status(200).send(orders);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

//completed
export const GetAllCompletedOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ownerId: req.params.providerId,
      status: "Completed",
    });

    if (!orders.length) {
      // Check if orders were found
      return res.status(404).send({ message: "No completed orders found" });
    }

    const userIds = orders.map((order) => order.userid);
    const ownerIds = orders.map((order) => order.ownerId);

    const [userDetails, ownerDetails] = await Promise.all([
      // Fetch details simultaneously
      Users.find({ _id: { $in: userIds } }),
      Providers.find({ _id: { $in: ownerIds } }),
    ]);

    const response = {
      orders: orders,
      userDetails: userDetails,
      ownerDetails: ownerDetails,
    };

    res.status(200).send(orders);
  } catch (error) {
    next(error);
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
    next(error); // Pass error to error handling middleware
  }
};

// Update an existing order
export const UpdateOrder = async (req, res, next) => {
  const { orderId } = req.params; // Correctly extracting orderId from req.params
  // console.log(req.body);

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

// Update an existing order
export const CompleteOrder = async (req, res, next) => {
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
