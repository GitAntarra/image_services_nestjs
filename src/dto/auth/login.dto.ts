import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  username: string;

  @ApiPropertyOptional({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  password: string;
}
