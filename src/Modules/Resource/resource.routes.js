// api router

import { Router } from "express";
import * as resourceController from "./resource.controller.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { AddResourceSchema } from "./resource.schema.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";

const router = Router();

// add resource
router.post(
  "/addResource",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(AddResourceSchema)),
  errorHandler(resourceController.addResource)
);
// get all resource
router.get(
  "/getAllResource",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware(["admin", "volunteer"])),
  errorHandler(resourceController.getAllResource)
)
export default router;
