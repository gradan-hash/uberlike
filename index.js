import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoute from "./routes/users/Auth.js";
import AuthRoutePro from "./routes/providers/Authproviders.js";
import ItemsRoute from "./routes/providers/items.js";
import clientItemRoute from "./routes/users/items.js";
import OrderRoute from "./routes/users/Order.js";
import OrderProvider from "./routes/providers/Order.js";
import AdminAuth from "./routes/Admin/Auth.js";
import UsersRoute from "./routes/Admin/Client.js";
import ProvidersRoute from "./routes/Admin/Providers.js";
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("database connection online");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors((req, callback) => {
    const corsOptions = {
      credentials: true, // Reflect the request's credentials (cookies, authorization headers, etc.)
    };

    // Allow all origins or specifically localhost:5173
    if (
      req.header("Origin") === "http://localhost:5173" ||
      req.header("Origin") === "https://localhost:5173"
    ) {
      corsOptions.origin = true; // Reflect the request origin, as defined by `req.header('Origin')`
    } else {
      corsOptions.origin = "*"; // Allow all origins
    }

    callback(null, corsOptions); // Callback expects two parameters: error and options
  })
);

app.use(express.json());
app.use(cookieParser());

//clients

app.use("/api/clients", AuthRoute);
app.use("/api/clients", OrderRoute);
app.use("/api/clients", clientItemRoute);

//providers
app.use("/api/providers", AuthRoutePro);
app.use("/api/providers", ItemsRoute);
app.use("/api/providers", OrderProvider);

//admin

app.use("/api/admin", AdminAuth);
app.use("/api/admin", UsersRoute);
app.use("/api/admin", ProvidersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(4000, () => {
  connect();
  console.log("backend running");
});
