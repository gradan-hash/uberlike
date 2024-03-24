import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next(createError(401, "you're not aunthenticated"));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(createError(403, "Token not valid"));

    req.userId = payload.id;

    next();
  });
};
