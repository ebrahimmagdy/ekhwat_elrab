import { Router } from "express";
import * as admin_volunteersController from "./admin-volunteers.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { SignInSchema, SignUpSchema } from "./admin-volunteers.schema.js";

// signUp

const router = Router();

router.post(
    "/signUp",
    errorHandler(validationMiddleware(SignUpSchema)),
    errorHandler(admin_volunteersController.SignUp)
);
// confirm email api
router.get(
  "/confirm-email/:token",
   errorHandler(admin_volunteersController.confirmEmail)
  );
// signIn 
// signIn api
router.post(
  "/signIn",
  errorHandler(validationMiddleware(SignInSchema)),
  errorHandler(admin_volunteersController.signIn)
);
export default router
