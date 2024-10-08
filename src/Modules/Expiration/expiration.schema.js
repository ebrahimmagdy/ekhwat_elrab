
// add expiration validation joi

import Joi from "joi";

export const AddExpirationSchema = {
  body: Joi.object({
    resourceId: Joi.string().required().messages({
      "string.base": "resourceId must be a string",
      "any.required": "resourceId is required",
    }),
    quantity: Joi.number().required().messages({
      "number.base": "quantity must be a number",
      "any.required": "quantity is required",
    }),
    startDate: Joi.date().iso().required().messages({
      "date.base": "Start Date is not valid",
      "any.required": "Start Date is required",
      "date.format": "Start Date must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
    expirationDate: Joi.date()
      .iso()
      .required()
      .greater(Joi.ref("startDate"))
      .messages({
        "date.base": "Expiration Date is not valid",
        "any.required": "Expiration Date is required",
        "date.format":
          "Expiration Date must be in ISO 8601 date format (YYYY-MM-DD)",
        "date.greater": "Expiration Date must be greater than the Start Date",
      }),
  }),
};
//-------------------
//general validation id in params

export const GeneralSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
    }),
  }),
}
//--------------------------
//update expiration validation joi
export const UpdateExpirationSchema = {
  body: Joi.object({
    resourceId: Joi.string().messages({
      "string.base": "resourceId must be a string",
    }),
    quantity: Joi.number().messages({
      "number.base": "quantity must be a number",
    }),
    startDate: Joi.date().iso().messages({
      "date.base": "Start Date is not valid",
      "date.format": "Start Date must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
    expirationDate: Joi.date()
      .iso()      
      .greater(Joi.ref("startDate"))
      .messages({
        "date.base": "Expiration Date is not valid",
        "date.format":
          "Expiration Date must be in ISO 8601 date format (YYYY-MM-DD)",
        "date.greater": "Expiration Date must be greater than the Start Date",
      }),
  }),
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
    }),
  }),
};
// -----------------
// check numberOfDay from query
export const CheckNumberOfDay = {
    
    query: Joi.object({
      numberOfDay: Joi.number().required().messages({
        "number.base": "numberOfDay must be a number",
        "any.required": "numberOfDay is required",
      }),
    }),
}