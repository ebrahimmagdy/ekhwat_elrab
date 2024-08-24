import { Router } from "express";
import * as needController from "./needs.controller.js";
import { AddNeedsSchema } from "./needs.schema.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";

const router = Router();

// add need
router.post(
  "/addNeeds",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(AddNeedsSchema)),
  errorHandler(needController.addNeeds)
);
// get all needs
router.get(
  "/getAllNeeds",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware(["admin", "volunteer"])),
  errorHandler(needController.getAllNeeds)
);


export default router