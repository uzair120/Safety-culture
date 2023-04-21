import * as Joi from 'joi';
import { WidgetType } from '../enum';

// export const schema = Joi.object({
//   type: Joi.number()
//     .required()
//     .valid(...Object.values(WidgetType)),
//   format: Joi.alternatives()
//     .conditional('type', {
//       is: WidgetType.DOCUMENT,
//       then: Joi.string().required(),
//     })
//     .conditional('type', {
//       is: WidgetType.NUMBER,
//       then: Joi.string().required(),
//     })
//     .conditional('type', {
//       is: WidgetType.TEXT_ANSWER,
//       then: Joi.string().required(),
//     }),
//   condition: Joi.alternatives().conditional('type', { is: 1, then: Joi.string().required() }),
//   greaterValue: Joi.alternatives().conditional('type', { is: 2, then: Joi.number().required() }),
//   smallerValue: Joi.alternatives().conditional('type', { is: 2, then: Joi.number().required() }),
//   dUnit: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   date: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   time: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   min: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   max: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   increment: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
//   imageUrl: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
// });

const schema = Joi.object({
  type: Joi.number().valid(...Object.values(WidgetType)),
})
  .when(Joi.object({ type: Joi.number().valid(WidgetType.SITE) }).unknown(), {
    then: Joi.object({}),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.CHECKBOX) }).unknown(), {
    then: Joi.object({}),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.MEDIA) }).unknown(), {
    then: Joi.object({}),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.SIGNATURE) }).unknown(), {
    then: Joi.object({}),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.LOCATION) }).unknown(), {
    then: Joi.object({}),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.DOCUMENT) }).unknown(), {
    then: Joi.object({
      format: Joi.string().required(),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.TEXT_ANSWER) }).unknown(), {
    then: Joi.object({
      format: Joi.string().required().valid('SHORT', 'PARAGRAPH'),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.NUMBER) }).unknown(), {
    then: Joi.object({
      format: Joi.string().required().valid('NUMBER', 'TEMP'),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.DATE_TIME) }).unknown(), {
    then: Joi.object({
      date: Joi.string().required().valid('TRUE', 'FALSE'),
      time: Joi.string().required().valid('TRUE', 'FALSE'),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.SLIDER) }).unknown(), {
    then: Joi.object({
      min: Joi.string().required(),
      max: Joi.string().required(),
      increment: Joi.string().required(),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.ANNOTATION) }).unknown(), {
    then: Joi.object({
      imageUrl: Joi.string().required(),
    }),
  })
  .when(Joi.object({ type: Joi.number().valid(WidgetType.INSTRUCTION) }).unknown(), {
    then: Joi.object({
      imageUrl: Joi.string().required(),
    }),
  })
  .unknown(true);

export { schema, getAttributesByType };

const getAttributesByType = (type: WidgetType) => {
  if (type == WidgetType.INSTRUCTION || type == WidgetType.ANNOTATION) {
    return ['imageUrl'];
  } else if (type == WidgetType.SLIDER) {
    return ['min', 'max', 'increment'];
  } else if (type == WidgetType.DATE_TIME) {
    return ['date', 'time'];
  } else if (type == WidgetType.NUMBER) {
    return ['condition', 'greater', 'smaller', 'dUnit'];
  } else {
    return [];
  }
};
