import express from "express";
import userRegistrationController from "../controllers/userRegistrationController.js";
import userLoginController from "../controllers/userLoginController.js";
const eCommerceRouter = express.Router();

eCommerceRouter.post("/register", userRegistrationController);
eCommerceRouter.post("/login", userLoginController);

export default eCommerceRouter;
