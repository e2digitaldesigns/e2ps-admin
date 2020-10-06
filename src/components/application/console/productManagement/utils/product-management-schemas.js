import Joi from "@hapi/joi";
import * as regs from "./../../../../../utils/schemaRegEx";

export const productNewSchema = Joi.object({
  storeFrontId: Joi.string(),
  name: Joi.string()
    .label("Product Name")
    .required()
    .min(3)
    .pattern(regs.regExp)
    .messages({ "string.pattern.base": regs.regExpErrorMsg }),
});

export const productProfileSchema = Joi.object({
  _id: Joi.string(),
  isActive: Joi.boolean().label("Is Active"),
  storeFrontId: Joi.string(),
  name: Joi.string()
    .label("Product Name")
    .required()
    .min(3)
    .pattern(regs.regExp)
    .messages({ "string.pattern.base": regs.regExpErrorMsg }),
  displayName: Joi.string()
    .label("Display Name")
    .required()
    .min(2)
    .pattern(regs.regExp)
    .messages({ "string.pattern.base": regs.regExpErrorMsg }),
  displayOrder: Joi.number().label("Display Order").allow("").min(0),
  isAdmin: Joi.boolean().label("Is Admin"),
  isAutoDesc: Joi.boolean().label("Is Auto Description"),
  isHomeGrid: Joi.boolean().label("Is Home Grid"),
  isPrint: Joi.boolean().label("Is Print"),
  isDesign: Joi.boolean().label("Is Design"),
  attributes: Joi.array().label("Attributes").allow(""),
  productSizes: Joi.array().label("Product Sizes").allow(""),
  printDesc: Joi.string().label("Print Description").allow(""),
  designDesc: Joi.string().label("Design Description").allow(""),
  url: Joi.string(),
});

export const productProfileSizeSchema = Joi.object({
  _id: Joi.string(),
  storeOwnerId: Joi.string(),
  storeFrontId: Joi.string(),
  productId: Joi.string(),
  size: Joi.string().label("Size").required(),
  isActive: Joi.boolean().label("Is Active"),
  dpi: Joi.number().label("DPI").allow(""),
  margin: Joi.number().label("Margin").allow(""),
  order: Joi.number().label("Order").allow("").min(0),
  designPrice1: Joi.number().label("Design Price 1").allow(""),
  designPrice2: Joi.number().label("Design Price 2").allow(""),
  date: Joi.string(),
});

export const productProfileQuantitySchema = Joi.object({
  _id: Joi.string(),
  storeOwnerId: Joi.string(),
  storeFrontId: Joi.string(),
  productId: Joi.string(),
  sizeId: Joi.string(),
  isActive: Joi.boolean().label("Is Active"),
  quantity: Joi.number().label("Quantity").min(0).required(),
  sides: Joi.number().label("Sides").required(),
  price1: Joi.number().label("Price 1").required(),
  price2: Joi.number().label("Price 2").required().allow(""),
});

export const attributeNewSchema = Joi.object({
  name: Joi.string()
    .label("Product Name")
    .required()
    .min(3)
    .pattern(regs.regExp)
    .messages({ "string.pattern.base": regs.regExpErrorMsg }),
});
