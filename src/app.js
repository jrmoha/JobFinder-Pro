import dotenv from "dotenv";
import { connect } from "../database/index.js";
import errorHandler, { routeError } from "./middleware/error.handler.js";
import userRoutes from "./modules/user/user.routes.js";
import companyRoutes from "./modules/company/company.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import express from "express";

dotenv.config({
  path: "./config/.env",
});

const PORT = +process.env.PORT;

/**
 *
 * @param {express.Application} app
 * @param {express} express
 */
export const start = (app, express) => {
  app.use(express.json());

  app.use("/users", userRoutes);
  app.use("/company", companyRoutes);
  app.use("/job", jobRoutes);

  app.all("*", routeError);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    connect(process.env.MONGODB_URI);
  });
};
