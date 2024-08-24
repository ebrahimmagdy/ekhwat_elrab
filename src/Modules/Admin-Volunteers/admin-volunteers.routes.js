import { Router } from "express";
import * as admin_volunteersController from "./admin-volunteers.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { SignUpSchema } from "./admin-volunteers.schema.js";

// signUp

const router = Router();

router.post(
    "/signUp",
    validationMiddleware(SignUpSchema),
    errorHandler(admin_volunteersController.SignUp)
);
// confirm email api
router.get(
  "/confirm-email/:token",
   errorHandler(admin_volunteersController.confirmEmail)
  );

export default router
