import Joi from "@hapi/joi";

import { regExp, regExpErrorMsg } from "./../../../../../utils/schemaRegEx";

export const staffNewSchema = Joi.object({
  name: Joi.string()
    .label("Name")
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});

export const staffProfileSchema = Joi.object({
  _id: Joi.string(),
  isActive: Joi.boolean(),
  name: Joi.string()
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string()
    .label("password")
    .required()
    .min(2)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  date: Joi.string(),
});
