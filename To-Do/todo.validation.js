import Joi from "joi";

export const todoValidation = Joi.object({
  name: Joi.string().min(1).required(),
  date: Joi.date().required(),
});
