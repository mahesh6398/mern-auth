import express from "express";
import {signup} from "../controller/auth.controller.js"

const router = new express.Router();

router.post('/singup',signup)

export default router