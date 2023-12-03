import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(requestErrorValidation);
app.use(rateLimitter);

// Application Routes
import requestErrorValidation from "./middlewares/requestErrorValidation";
import rateLimitter from "./middlewares/rateLimitter";

export default app;
