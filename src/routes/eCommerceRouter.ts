import express from "express";
import userRegistrationController from "../controllers/userRegistrationController.js";

const eCommerceRouter = express.Router();

eCommerceRouter.post("/register",userRegistrationController )


export default eCommerceRouter;
