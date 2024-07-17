import { Router } from "express";
import * as familyController from "./family.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { AddFamilySchema } from "./family.schema.js";

const router = Router();


// add family
router.post(
     '/addFamily' ,
     validationMiddleware(AddFamilySchema),
     errorHandler(familyController.addFamily)
)

export default router;
