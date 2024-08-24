
// add resource schema validation joi

import Joi from "joi";

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
