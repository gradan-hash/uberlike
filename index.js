import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoute from "./routes/users/Auth.js";
import AuthRoutePro from "./routes/providers/Authproviders.js";
import ItemsRoute from "./routes/providers/items.js";
import OrderRoute from "./routes/users/Order.js";

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
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//clients

app.use("/api/clients", AuthRoute);
app.use("/api/clients", OrderRoute);
// app.use("/api/clients", TripsAuthRoute);

//providers
app.use("/api/providers", AuthRoutePro);
app.use("/api/providers", ItemsRoute);
// app.use("/api/providers", ItemsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(4000, () => {
  connect();
  console.log("backend running");
});
