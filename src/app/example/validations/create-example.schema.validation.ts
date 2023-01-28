import * as JoiBase from 'joi';

import { CreateSchema } from '@app/@common/schemas/joi/joi.create-schema.interface';
import joiMessagesSchema from '@app/@common/schemas/joi/joi.messages.schema';

const Joi = JoiBase;

export class CreateExampleSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      title: Joi.string()
        .required()
        .label('Título')
        .messages(joiMessagesSchema),
    });
  }
}
