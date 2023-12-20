import express from "express";
import jsonWebTokenAuthorization from "../../../../middlewares/jsonWebTokenAuthorization";
import generateSecretKey from "../controllers/client-keys.post.controller";
const router = express.Router();

router.post("/generate", jsonWebTokenAuthorization, generateSecretKey);

export default router;
