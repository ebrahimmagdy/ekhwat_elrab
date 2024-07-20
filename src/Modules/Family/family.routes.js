import { Router } from "express";
import * as familyController from "./family.controller.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { AddFamilySchema, GetFamilyByIdSchema } from "./family.schema.js";

const router = Router();

// add family
router.post(
  "/addFamily",
  validationMiddleware(AddFamilySchema),
  errorHandler(familyController.addFamily)
);

// get all family
router.get("/getAllFamily", errorHandler(familyController.getAllFamily));

// get family by id
router.get("/getFamilyById/:id",
       validationMiddleware(GetFamilyByIdSchema)
     , errorHandler(familyController.getFamilyById));

export default router;
