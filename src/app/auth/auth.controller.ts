import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Users } from 'src/entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth/login.dto';

@Controller('')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async create(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseDto<string, Users>> {
    return await this.authService.login(loginDto);
  }
}
