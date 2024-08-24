/**
 * add needs Schema validation
 * familyId , member ids from query
 * name , quantity , price from body
 */

import Joi from "joi";
import { objectIdValidation } from "../../utils/general-rules.utils.js";

export const AddNeedsSchema = {
  body: Joi.object({
    need: Joi.string().required().messages({
      "string.base": "name must be a string",
      "any.required": "name is required",
    }),
    quantity: Joi.number().required().messages({
      "any.required": "quantity is required",
      "string.base": "quantity must be a number",
    }),
    price: Joi.number().required().messages({
      "string.base": "price must be a number",
    }),
  }),
  query: Joi.object({
    familyId: Joi.string()
      .custom(objectIdValidation, "Object ID Validation")
      .required()
      .messages({
        "any.required": "Family ID is required",
        "string.base": "Family ID must be a string",
        "string.pattern": "Family ID must be a valid ObjectId",
      }),
    member: Joi.string()
      .custom(objectIdValidation, "Object ID Validation")
      .messages({
        "string.base": "member must be a string",
        "string.pattern": "member must be a valid ObjectId",
      }),
  }),
};
//---------------------------
//general schema check id in params 

export const GeneralSchema = {
  params: Joi.object({
    id: Joi.string().custom(objectIdValidation, "Object ID Validation").required().messages({
      "string.base": "id must be a string",
      "string.pattern": "id must be a valid ObjectId",
      "any.required": "id is required",
    })
  }),
}