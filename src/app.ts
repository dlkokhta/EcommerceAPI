import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoConnection from "./config/mongo.js";
import eCommerceRouter from "./routes/eCommerceRouter.js";
import swaggerMiddleware from "./middlewears/swagger-middleware.js";

// import { sensitiveHeaders } from "./email/edge.js";
// import { recoveryHeader } from "./email/edge.js";

dotenv.config();
mongoConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", eCommerceRouter);
app.use("/public", express.static("public"));
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
