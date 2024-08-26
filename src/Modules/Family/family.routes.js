import { Router } from "express";
import * as familyController from "./family.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import {
  AddFamilySchema,
  GeneralSchema,
  UpdateFamilySchema,
} from "./family.schema.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
const router = Router();

// add family
router.post(
  "/addFamily",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(AddFamilySchema)),
  errorHandler(familyController.addFamily)
);

// get all family
router.get(
  "/getAllFamily",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(familyController.getAllFamily)
);

// get family by id
router.get(
  "/getFamilyById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(familyController.getFamilyById)
);

// delete family by id
router.delete(
  "/deleteFamilyById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  validationMiddleware(GeneralSchema),
  errorHandler(familyController.deleteFamilyById)
);

// update family by id
router.put(
  "/updateFamilyById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(UpdateFamilySchema)),
  errorHandler(familyController.updateFamilyById)
);
export default router;
