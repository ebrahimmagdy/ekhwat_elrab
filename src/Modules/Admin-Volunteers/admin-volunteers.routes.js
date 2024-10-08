import { Router } from "express";
import * as admin_volunteersController from "./admin-volunteers.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { forgetPasswordSchema, generalSchemaCheckOnlyToken, profileSchema, resetPasswordSchema, SignInSchema, SignUpSchema, updatePasswordSchema, updateUserSchema } from "./admin-volunteers.schema.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";

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
//get user api if user login
router.get(
  "/getAccountData",
  errorHandler(authenticate()),
  errorHandler(validationMiddleware(generalSchemaCheckOnlyToken)),
  errorHandler(admin_volunteersController.getAccountData)
);

// get user api if user not login
router.get(
  "/getAllUsers",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(generalSchemaCheckOnlyToken)),
  errorHandler(admin_volunteersController.getAllUsers)
);
// get profile api another user send userId in params and query
router.get(
  "/getProfileData/:userId?",
  errorHandler(authenticate()),
  errorHandler(authorizationMiddleware("admin")),
  errorHandler(validationMiddleware(profileSchema)),
  errorHandler(admin_volunteersController.getProfileData)
);
// delete user api
router.delete(
  "/deleteAccount",
  errorHandler(authenticate()),
  errorHandler(validationMiddleware(generalSchemaCheckOnlyToken)),
  errorHandler(admin_volunteersController.deleteUser)
);
// api update user password
router.patch(
  "/updatePassword",
  errorHandler(authenticate()),
  errorHandler(validationMiddleware(updatePasswordSchema)),
  errorHandler(admin_volunteersController.updatePassword)
);


// forget password
router.post(
  "/forgetPassword",
  errorHandler(validationMiddleware(forgetPasswordSchema)),
  errorHandler(admin_volunteersController.forgetPassword)
);

// reset password
router.post(
  "/resetPassword",
  errorHandler(validationMiddleware(resetPasswordSchema)),
  errorHandler(admin_volunteersController.resetPassword)
)
export default router
