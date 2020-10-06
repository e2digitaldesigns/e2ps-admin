import Joi from '@hapi/joi';
import {
  regExp,
  regExpErrorMsg,
  regExpPhone,
  regExpPhoneErrorMessage,
  regExpZipCode,
  regExpZipCodeErrorMessage,
} from './../../../../../utils/schemaRegEx';

export const supplierNewSchema = Joi.object({
  companyName: Joi.string()
    .label('Company Name')
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
});

export const supplierProfileSchema = Joi.object({
  _id: Joi.string(),
  isActive: Joi.boolean(),
  companyName: Joi.string()
    .label('Company Name')
    .required()
    .min(3)
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
  contactName: Joi.string()
    .label('Contact Name')
    .required()
    .allow('')
    .min(2)
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
  address1: Joi.string()
    .label('Address')
    .allow('')
    .min(3)
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
  address2: Joi.string()
    .allow('')
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
  city: Joi.string()
    .allow('')
    .pattern(regExp)
    .messages({ 'string.pattern.base': regExpErrorMsg }),
  state: Joi.string().allow('').min(2).required(),
  zipCode: Joi.string()
    .allow('')
    .min(5)
    .pattern(regExpZipCode)
    .messages({ 'string.pattern.base': regExpZipCodeErrorMessage }),
  phone: Joi.string()
    .required()
    .allow('')
    .min(10)
    .pattern(regExpPhone)
    .messages({ 'string.pattern.base': regExpPhoneErrorMessage }),
  email: Joi.string()
    .required()
    .allow('')
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  orderEmail: Joi.string()
    .required()
    .allow('')
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  emailOrders: Joi.boolean(),
  memo: Joi.string().allow(''),
});
