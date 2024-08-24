import { Router } from "express";
import * as userController from "./user.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { AddUserSchema, GeneralSchema, UpdateUserSchema } from "./user.schema.js";


const router = Router();

// add user
router.post(
    "/addUser/:familyId",
    validationMiddleware(AddUserSchema),
    errorHandler(userController.addUser)
);
//get all user 
router.get(
    "/getAllUser",
    errorHandler(userController.getAllUser)
)
// get user by id
router.get(
    "/getUserById/:id",
    validationMiddleware(GeneralSchema),
    errorHandler(userController.getUserById)
)
// delete user by id
router.delete(
    "/deleteUserById/:id",
    validationMiddleware(GeneralSchema),
    errorHandler(userController.deleteUserById)
)
// update user by id
router.put(
    "/updateUserById/:id",
    validationMiddleware(UpdateUserSchema),
    errorHandler(userController.updateUserById)
)

export default router;