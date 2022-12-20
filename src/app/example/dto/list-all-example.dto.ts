import { ApiProperty } from '@nestjs/swagger';

export class ListAllExampleOutputDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'boolean' })
  is_active: boolean;
}
