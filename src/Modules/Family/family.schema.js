// family validation api
import Joi from "joi";
import {
  generalRules,
  objectIdValidation,
} from "../../utils/general-rules.utils.js";

// add family

export const AddFamilySchema = {
  body: Joi.object({
    familyName: Joi.string().required().min(3).messages({
      "string.min": "familyName must be at least 3 characters long",
      "string.base": "familyName must be a string",
      "any.required": "jobTitle is required",
    }),
    comment: Joi.string().min(3).messages({
      "string.min": "comment must be at least 3 characters long",
      "string.base": "jobTitle must be a string",
    }),
  }),
};

// get family by id

export const GeneralSchema = {
params: Joi.object({
    id: Joi.string()
      .custom(objectIdValidation, "Object ID Validation")
      .required()
      .messages({
        "any.required": "Family ID is required",
        "string.base": "Family ID must be a string",
        "string.pattern": "Family ID must be a valid ObjectId",
      }),
  })
}