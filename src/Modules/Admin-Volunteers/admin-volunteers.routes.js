import { Router } from "express";
import * as admin_volunteersController from "./admin-volunteers.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { generalSchemaCheckOnlyToken, SignInSchema, SignUpSchema, updateUserSchema } from "./admin-volunteers.schema.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";

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
// signIn api
router.post(
  "/signIn",
  errorHandler(validationMiddleware(SignInSchema)),
  errorHandler(admin_volunteersController.signIn)
);

// logout api
router.post(
  "/logOut",
  errorHandler(authenticate()),
  errorHandler(validationMiddleware(generalSchemaCheckOnlyToken)),
  errorHandler(admin_volunteersController.logOut)
);


// update user api
router.put(
  "/updateAccount",
  errorHandler(authenticate()),
  errorHandler(validationMiddleware(updateUserSchema)),
  errorHandler(admin_volunteersController.updateAccount)
);



export default router
