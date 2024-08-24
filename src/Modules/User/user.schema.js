// user validation api
import Joi from "joi";
import {
    generalRules,
    objectIdValidation,
} from "../../utils/general-rules.utils.js";


// add user

export const AddUserSchema = {
  body: Joi.object({
    firstName: Joi.string().required().min(3).messages({
      "string.min": "firstName must be at least 3 characters long",
      "string.base": "firstName must be a string",
      "any.required": "firstName is required",
    }),
    secondName: Joi.string().required().min(3).messages({
      "string.min": "secondName must be at least 3 characters long",
      "string.base": "secondName must be a string",
      "any.required": "secondName is required",
    }),
    thirdName: Joi.string().required().min(3).messages({
      "string.min": "thirdName must be at least 3 characters long",
      "string.base": "thirdName must be a string",
      "any.required": "thirdName is required",
    }),
    fourthName: Joi.string().required().min(3).messages({
      "string.min": "fourthName must be at least 3 characters long",
      "string.base": "fourthName must be a string",
      "any.required": "fourthName is required",
    }),
    SSN: Joi.string().pattern(/^\d+$/).max(14).required().messages({
      "string.base": "SSN must be a string",
      "string.pattern.base": "SSN must only contain digits",
      "string.max": "SSN must be at most 14 characters long",
      "any.required": "SSN is required",
    }),
    age: Joi.number().required().messages({
      "number.base": "age must be a number",
      "any.required": "age is required",
    }),
    // enum values: male, female
    gender: Joi.string().valid("male", "female").required().messages({
      "string.base": "gender must be a string",
      "string.valid": "gender must be male or female",
      "any.required": "gender is required",
    }),
    comment: Joi.string().min(3).messages({
      "string.min": "comment must be at least 3 characters long",
      "string.base": "comment must be a string",
    }),
   
  }),

  params: Joi.object({
    familyId: Joi.string()
      .custom(objectIdValidation, "Object ID Validation")
      .required()
      .messages({
        "any.required": "Family ID is required",
        "string.base": "Family ID must be a string",
        "string.pattern": "Family ID must be a valid ObjectId",
      }),
  }),
};
//--------------------
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
  }),
};
//------------------
//update user schema
export const UpdateUserSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).messages({
      "string.min": "firstName must be at least 3 characters long",
      "string.base": "firstName must be a string",
    }),
    secondName: Joi.string().min(3).messages({
      "string.min": "secondName must be at least 3 characters long",
      "string.base": "secondName must be a string",
    }),
    thirdName: Joi.string().min(3).messages({
      "string.min": "thirdName must be at least 3 characters long",
      "string.base": "thirdName must be a string",
    }),
    fourthName: Joi.string().min(3).messages({
      "string.min": "fourthName must be at least 3 characters long",
      "string.base": "fourthName must be a string",
    }),
    SSN: Joi.string().pattern(/^\d+$/).max(14).messages({
      "string.base": "SSN must be a string",
      "string.pattern.base": "SSN must only contain digits",
      "string.max": "SSN must be at most 14 characters long",
    }),
    age: Joi.number().messages({
      "number.base": "age must be a number",
    }),
    // enum values: male, female
    gender: Joi.string().valid("male", "female").messages({
      "string.base": "gender must be a string",
      "string.valid": "gender must be male or female",
    }),
    comment: Joi.string().min(3).messages({
      "string.min": "comment must be at least 3 characters long",
      "string.base": "comment must be a string",
    }),

  }),

  params: Joi.object({
    id: Joi.string()
      .custom(objectIdValidation, "Object ID Validation")
      .required()
      .messages({
        "any.required": "User ID is required",
        "string.base": "User ID must be a string",
        "string.pattern": "User ID must be a valid ObjectId",
      }),
  }),

};
