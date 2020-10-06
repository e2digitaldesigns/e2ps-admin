import Joi from "@hapi/joi";

import {
  regExp,
  regExpErrorMsg,
  regExpPhone,
  regExpPhoneErrorMessage,
  regExpZipCode,
  regExpZipCodeErrorMessage,
} from "./../../../../../utils/schemaRegEx";

export const customerNewSchema = Joi.object({
  _id: Joi.string(),
  isActive: Joi.boolean(),
  storeFrontId: Joi.string(),
  companyName: Joi.string()
    .label("Company Name")
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  firstName: Joi.string()
    .label("First Name")
    .required()
    .min(2)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  lastName: Joi.string()
    .label("Last Name")
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  phone: Joi.string()
    .required()
    .min(10)
    .pattern(regExpPhone)
    .messages({ "string.pattern.base": regExpPhoneErrorMessage }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});

export const customerContactSchema = Joi.object({
  _id: Joi.string(),
  isActive: Joi.boolean(),
  storeFrontId: Joi.string(),
  companyName: Joi.string()
    .label("Company Name")
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  firstName: Joi.string()
    .label("First Name")
    .required()
    .min(2)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  lastName: Joi.string()
    .label("Last Name")
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  address1: Joi.string()
    .label("Address")
    .allow("")
    .min(3)
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  address2: Joi.string()
    .allow("")
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  city: Joi.string()
    .allow("")
    .pattern(regExp)
    .messages({ "string.pattern.base": regExpErrorMsg }),
  state: Joi.string().allow("").min(2).required(),
  zipCode: Joi.string()
    .allow("")
    .min(5)
    .pattern(regExpZipCode)
    .messages({ "string.pattern.base": regExpZipCodeErrorMessage }),
  phone: Joi.string()
    .required()
    .min(10)
    .pattern(regExpPhone)
    .messages({ "string.pattern.base": regExpPhoneErrorMessage }),
  mobile: Joi.string()
    .allow("")
    .min(10)
    .pattern(regExpPhone)
    .messages({ "string.pattern.base": regExpPhoneErrorMessage }),
  pin: Joi.number().allow("").min(1000).max(9999),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  shippingProfiles: Joi.allow(""),
});
