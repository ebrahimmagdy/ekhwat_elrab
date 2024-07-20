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
