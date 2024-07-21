import { Router } from "express";
import * as userController from "./user.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { AddUserSchema } from "./user.schema.js";


const router = Router();

// add user
router.post(
    "/addUser/:familyId",
    validationMiddleware(AddUserSchema),
    errorHandler(userController.addUser)
);


export default router;