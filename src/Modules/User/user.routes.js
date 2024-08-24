import { Router } from "express";
import * as userController from "./user.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import {
  AddUserSchema,
  GeneralSchema,
  UpdateUserSchema,
} from "./user.schema.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";

const router = Router();

// add user
router.post(
  "/addUser/:familyId",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(AddUserSchema)),
  errorHandler(userController.addUser)
);
//get all user
router.get(
  "/getAllUser",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware(["admin", "volunteer"])),
  errorHandler(userController.getAllUser)
);
// get user by id
router.get(
  "/getUserById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware(["admin", "volunteer"])),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(userController.getUserById)
);
// delete user by id
router.delete(
  "/deleteUserById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(GeneralSchema)),
  errorHandler(userController.deleteUserById)
);
// update user by id
router.put(
  "/updateUserById/:id",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(UpdateUserSchema)),
  errorHandler(userController.updateUserById)
);

export default router;
