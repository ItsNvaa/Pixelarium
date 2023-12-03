import express from "express";
const router = express.Router();
import {
  loginWithGoogle,
  redirectGoogleLogin,
} from "../controllers/google.auth.controller";
import {
  redirectGithubLogin,
  loginWithGithub,
} from "../controllers/github.auth.controller";
import { redirectBitbucketLogin } from "../controllers/bitbucket.auth.controller";

router.get("/google", redirectGoogleLogin);
router.get("/google/callback", loginWithGoogle);
router.get("/github", redirectGithubLogin);
router.get("/github/callback", loginWithGithub);
router.get("/bitbucket", redirectBitbucketLogin);

export default router;
