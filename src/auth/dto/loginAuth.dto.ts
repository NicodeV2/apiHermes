import { ApiProperty } from '@nestjs/swagger';

export class loginAuthDto {
  @ApiProperty({ description: 'User', example: 'John Doe' })
  user: string;
  @ApiProperty({ description: 'Pass', example: 'jdoe123' })
  pass: string;
}
