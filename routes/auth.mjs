import express from "express";
import { getLogin, getSignup, postLogin, postLogout, postSignup } from "../controllers/auth.mjs";
import isAuthorized from "../middlewares/isAuthorized.mjs";

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get('/logout', isAuthorized, postLogout);
router.get('/signup', getSignup);
router.post('/signup', postSignup);

export default router;