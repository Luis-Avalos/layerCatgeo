import { Router } from "express";
import controller from "../controllers/passwordResetController.js";

const router = Router();

router.post("/request-reset", controller.requestReset);
router.post("/verify-code", controller.verifyCode);
router.post("/reset-password", controller.resetPassword);

export default router;
