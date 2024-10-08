import express from "express";
import userRegistrationController from "../controllers/userRegistrationController.js";
import userLoginController from "../controllers/userLoginController.js";
import addItemsController from "../controllers/addItemsController.js";
const eCommerceRouter = express.Router();
import multer from "multer";
import getAllShoes from "../controllers/getAllShoes.js";
// import getShoesById from "../controllers/getShoesById.js";
import postCartItems from "../controllers/postCartItems.js";
import verifyToken from "../middlewears/auth-middleware.js";
import getCartItems from "../controllers/getCartItems.js";
import deleteShoes from "../controllers/deleteShoes.js";
import adminVerifyToken from "../middlewears/admin-auth-middleware.js";
import deleteShoesByAdmin from "../controllers/deleteShoesByAdmin.js";
import UsersListForAdminPanel from "../controllers/usersListForAdminPanel.js";
import deleteUserbyAdmin from "../controllers/deleteUserbyAdmin.js";
import verifyUserController from "../controllers/verifyUserController .js";
import checkEmailVerified from "../middlewears/emailVerify-auth-middleware.js";
import PasswordRecovery from "../controllers/PasswordRecovery.js";
import GenerateOTP from "../controllers/GenerateOTP.js";
import PasswordReset from "../controllers/PasswordReset.js";
import PurchasedShoes from "../controllers/PurchasedShoes.js";
import PurchasedGet from "../controllers/PurchasedGet.js";

const fileStorage = multer.diskStorage({
  destination: (_, _file, cb) => {
    cb(null, "./public/storage/images");
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (_: any, files: any, cb: any) => {
  if (
    files.mimetype === "image/png" ||
    files.mimetype === "image/jpg" ||
    files.mimetype === "image/jpeg" ||
    files.mimetype === "image/webp" ||
    files.mimetype === "image/avif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

eCommerceRouter.post(
  "/addItem",
  adminVerifyToken,
  multer({ storage: fileStorage, fileFilter }).array("image", 5),
  addItemsController
);
eCommerceRouter.post("/register", userRegistrationController);
eCommerceRouter.post("/login", checkEmailVerified, userLoginController);
eCommerceRouter.get("/getAllShoes", getAllShoes);
eCommerceRouter.post("/postCart", checkEmailVerified, postCartItems);
eCommerceRouter.get("/getCartItems/:email", verifyToken, getCartItems);
eCommerceRouter.delete("/deleteShoes/:email/:itemId", verifyToken, deleteShoes);
eCommerceRouter.delete(
  "/deleteShoesByAdmin/:id",
  adminVerifyToken,
  deleteShoesByAdmin
);
eCommerceRouter.get("/getAllUsers", adminVerifyToken, UsersListForAdminPanel);
eCommerceRouter.delete(
  "/deleteUserByAdmin/:id",
  adminVerifyToken,
  deleteUserbyAdmin
);
eCommerceRouter.post("/verify", verifyUserController);
eCommerceRouter.post("/recoverPassword", PasswordRecovery);
eCommerceRouter.post("/GenerateOTP", GenerateOTP);
eCommerceRouter.post("/resetPassword", verifyToken, PasswordReset);
eCommerceRouter.post("/purchased", verifyToken, PurchasedShoes);
eCommerceRouter.get("/purchaseGet/:email", verifyToken, PurchasedGet);

export default eCommerceRouter;
