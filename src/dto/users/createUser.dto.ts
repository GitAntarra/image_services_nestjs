import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiPropertyOptional({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiPropertyOptional({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;
}
