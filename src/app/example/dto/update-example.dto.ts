import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExampleInputDto {
  @ApiProperty({ type: 'string', example: faker.name.firstName() })
  name: string;

  @ApiProperty({ type: 'string', example: '123456' })
  password: string;

  @ApiProperty({ type: 'boolean' })
  is_active?: boolean;
}

export class UpdateExampleOutputDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'boolean' })
  is_active: boolean;
}
