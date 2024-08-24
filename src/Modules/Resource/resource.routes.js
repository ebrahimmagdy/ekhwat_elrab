// api router

import { Router } from "express";
import * as resourceController from "./resource.controller.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { AddResourceSchema, GeneralSchema, UpdateResourceSchema } from "./resource.schema.js";
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
);
// get resource by id
router.get(
  "/getResourceById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware(["admin", "volunteer"])),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(resourceController.getResourceById)
);
// delete resource by id
router.delete(
  "/deleteResourceById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(resourceController.deleteResourceById)
)
// update resource by id
router.put(
    "/updateResourceById/:id",
    errorHandler(authenticate()),
    errorHandler(authorizationMiddleware("admin")),
    errorHandler(validationMiddleware(UpdateResourceSchema)),
    errorHandler(resourceController.updateResourceById)
)
export default router;
