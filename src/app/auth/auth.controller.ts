import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Users } from 'src/entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth/login.dto';
import { CreateUserDto } from 'src/dto/users/createUser.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<string, Users>> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async Register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDto<string, Users>> {
    return await this.authService.Register(createUserDto);
  }
}
