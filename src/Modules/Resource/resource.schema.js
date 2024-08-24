

import Joi from "joi";
import { objectIdValidation } from "../../utils/general-rules.utils.js";
// add resource schema validation joi

export const AddResourceSchema = {
    body: Joi.object({
        name: Joi.string().required().messages({
            "string.base": "name must be a string",
            "any.required": "name is required",
        }),
        quantity: Joi.number().required().messages({
            "number.base": "quantity must be a number",
            "any.required": "quantity is required",
        }),
        type: Joi.string().required().messages({
            "string.base": "type must be a string",
            "any.required": "type is required",
        }),
    }),
}
//-----------------------------
//general schema check id in params

export const GeneralSchema = {
    params: Joi.object({
        id: Joi.string()
            .custom(objectIdValidation, "Object ID Validation")
            .required()
            .messages({
                "any.required": "Resource ID is required",
                "string.base": "Resource ID must be a string",
                "string.pattern": "Resource ID must be a valid ObjectId",
            }),
    }),
}
