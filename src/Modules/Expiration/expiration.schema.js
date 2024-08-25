
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
