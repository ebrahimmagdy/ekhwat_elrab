
// router
import { Router } from "express";

// controller
import * as expirationController from "./expiration.controller.js";
import { AddExpirationSchema } from "./expiration.schema.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
// router
const router = Router();

// add expiration
router.post(
  "/addExpiration",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(AddExpirationSchema)),
  errorHandler(expirationController.addExpiration)
);

export default router
