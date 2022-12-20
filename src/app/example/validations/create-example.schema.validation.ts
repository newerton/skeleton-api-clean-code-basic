import * as JoiBase from 'joi';

import { CreateSchema } from '@app/@common/schemas/joi/joi.create-schema.interface';
import joiMessagesSchema from '@app/@common/schemas/joi/joi.messages.schema';

const Joi = JoiBase;

export class CreateExampleSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      name: Joi.string().required().label('Nome').messages(joiMessagesSchema),
      password: Joi.string()
        .required()
        .label('Senha')
        .messages(joiMessagesSchema),
      is_active: Joi.boolean()
        .default(false)
        .label('Status')
        .messages(joiMessagesSchema),
    });
  }
}
