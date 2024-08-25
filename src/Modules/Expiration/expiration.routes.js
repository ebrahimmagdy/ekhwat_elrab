// router
import { Router } from "express";

// controller
import * as expirationController from "./expiration.controller.js";
import { AddExpirationSchema, CheckNumberOfDay, GeneralSchema, UpdateExpirationSchema } from "./expiration.schema.js";
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
// get all expiration
router.get(
  "/getAllExpiration",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(expirationController.getAllExpiration)
);
// get expiration by id
router.get(
  "/getExpirationById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(expirationController.getExpirationById)
);
// delete expiration by id
router.delete(
  "/deleteExpirationById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(expirationController.deleteExpirationById)
)
// update expiration by id
router.put(
  "/updateExpirationById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(UpdateExpirationSchema)),
  errorHandler(expirationController.updateExpirationById)
);
// get all expiration 
router.get(
  "/getAllExpiringByNumberOfDay",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(CheckNumberOfDay)),
  errorHandler(expirationController.getAllExpiringByNumberOfDay)
);
export default router;
