import express from "express";
import { verifyToken } from "../utils/token.js";
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const withUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const verification = verifyToken(token);
  if (verification) {
    req.user = verification;
    next();
  } else {
    return res.redirect("/login");
  }
};

export default withUser;
