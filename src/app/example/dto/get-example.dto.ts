import { ApiProperty } from '@nestjs/swagger';

export class GetExampleOutputDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'boolean' })
  is_active: boolean;
}
