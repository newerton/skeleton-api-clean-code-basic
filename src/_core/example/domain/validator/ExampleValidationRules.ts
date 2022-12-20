import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ExampleProperties } from '../entity/type/ExampleProperties';

export class ExampleValidationRules {
  constructor(payload: ExampleProperties) {
    Object.assign(this, payload);
  }

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;
}
