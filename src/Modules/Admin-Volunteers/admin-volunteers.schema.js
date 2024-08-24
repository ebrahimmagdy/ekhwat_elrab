import Joi from "joi";

import { systemRoles } from "../../utils/system-roles.utils.js";
import {
  generalRules,
  objectIdValidation,
} from "../../utils/general-rules.utils.js";

/* user schema validation all input before the arrive to api signUp user
  the validation only data in body
*/

export const SignUpSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(15).required().messages({
      "string.min": "firstName should have a minimum length of 3 characters",
      "string.max": "firstName should have a maximum length of 15 characters",
      "any.required": "firstName is required",
      "string.base": "firstName must be a string",
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
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .required()
      .messages({
        "string.email": "Email is not valid",
        "any.required": "Email is required",
        "string.base": "Email must be a string",
      }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
        "string.base": "Password must be a string",
      }),

    DOB: Joi.date().iso().messages({
      "date.base": "User birthDate is not valid",
      "date.format":
        "User birthDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
    mobileNumber: Joi.string()
      .pattern(/^(\+20|0)?1[0125]\d{8}$/)
      .required()
      .messages({
        "string.pattern.base": "Mobile Number is Not Valid",
        "any.required": "You need to provide a mobile number",
        "string.base": "mobile number must be a string",
      }),
    role: Joi.string()
      .valid(...Object.values(systemRoles))
      .required()
      .messages({
        "any.only": "Role must be one of admin or volunteers",
        "any.required": "Role is required",
      }),
    status: Joi.string().valid("online", "offline").messages({
      "any.only": "Status must be either online or offline",
    }),
  }),
};
//--------------

/* user schema validation all input before the arrive to api signIn user
  the validation only data in body
*/
export const SignInSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .messages({
        "string.email": "Email is not valid",
        "string.base": "Email must be a string",
        "any.required": "Email is required",
      }),
    mobileNumber: Joi.string()
      .pattern(/^(\+20|0)?1[0125]\d{8}$/)
      .messages({
        "string.pattern.base": "Mobile Number is Valid",
        "any.required": "You need to provide a mobile number",
        "string.base": "mobile number must be a string",
      }),
    
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
        "string.base": "Password must be a string",
      }),
  }).xor("email", "mobileNumber"),
};
//--------------------------

/**
 * generalSchemaCheckOnlyToken schema to validate
  - token in header
 */

export const generalSchemaCheckOnlyToken = {
  headers: Joi.object({
    token: Joi.string().required().messages({
      "string.base": "Token must be a string",
      "any.required": "Token is required",
    }),
    ...generalRules.headers,
  }),
};
//------------------------------------


/*
 * schema update user
 * check validation of the new user data from body
 * check token in header
 */

export const updateUserSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(15).messages({
      "string.min": "firstName should have a minimum length of 3 characters",
      "string.max": "firstName should have a maximum length of 15 characters",
      "any.required": "firstName is required",
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
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .messages({
        "string.email": "Email is not valid",
        "any.required": "Email is required",
        "string.base": "Email must be a string",
      }),
    DOB: Joi.date().iso().messages({
      "date.base": "User birthDate is not valid",
      "date.format":
        "User birthDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
    mobileNumber: Joi.string()
      .pattern(/^(\+20|0)?1[0125]\d{8}$/)
      .messages({
        "string.pattern.base": "Mobile Number is Valid",
        "any.required": "You need to provide a mobile number",
        "string.base": "mobile number must be a string",
      }),
    password: Joi.forbidden().messages({
      "any.unknown": "User Password is not allowed to be updated",
    }),
    role: Joi.forbidden().messages({
      "any.unknown": "User Role is not allowed to be updated",
    }),
    status: Joi.string().valid("online", "offline").messages({
      "any.only": "Status must be either online or offline",
    }),
  }),
  headers: Joi.object({
    token: Joi.string().required().messages({
      "string.base": "Token must be a string",
      "any.required": "Token is required",
    }),
    ...generalRules.headers,
  }),
};
//---------------------

/*
  schema user profile through send id user in query or params
*/

export const profileSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string()
      .custom(objectIdValidation, "Object Id Validation")
      .required()
      .messages({
        "any.required": "ID is required in params",
        "string.base": "ID must be a string",
      }),
  }),
  query: Joi.object({
    userId: Joi.string()
      .custom(objectIdValidation, "Object Id Validation")
      .required()
      .messages({
        "any.required": "ID is required in query",
        "string.base": "ID must be a string",
      }),
  }),
}).or("params", "query"); // Use or to ensure either params or query contains userId
