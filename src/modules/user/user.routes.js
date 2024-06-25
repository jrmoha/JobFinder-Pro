import { Router } from "express";
import UC from "./user.controller.js";
import { authenticate } from "../../middleware/authentication.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import * as UV from "./user.validate.js";

const router = Router();

router.post("/register", validate(UV.registerSchema), UC.register);
router.post("/login", validate(UV.loginSchema), UC.login);
router.patch("/update", authenticate(), validate(UV.updateSchema), UC.update);
router.delete("/delete", authenticate(), UC.deleteAccount);
router.get("/me", authenticate(), UC.get);
router.get(
  "/all",
  validate(UV.getAssociatedRecoveryEmailSchema),
  UC.get_associated_recovery_email
);
router.get("/:id", validate(UV.profileSchema), UC.profile);
router.patch(
  "/change-password",
  authenticate(),
  validate(UV.changePasswordSchema),
  UC.change_password
);
router.post("/send-otp", validate(UV.sendOTPSchema), UC.request_password_reset);
router.post(
  "/forgot-password",
  validate(UV.forgotPasswordSchema),
  UC.forgot_password
);

export default router;
