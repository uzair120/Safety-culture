import * as Joi from 'joi';

export const createTemplateSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(500).allow(null, '').optional(),
  business_id: Joi.number().required(),
  created_by: Joi.number().required(),
  total_score: Joi.number().optional().allow(null),
  published: Joi.boolean().optional().default(false),
});

export const updateTemplateSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  description: Joi.string().max(500).allow(null, '').optional(),
  business_id: Joi.number().optional(),
  created_by: Joi.number().optional(),
  total_score: Joi.number().optional().allow(null),
  published: Joi.boolean().optional(),
});
