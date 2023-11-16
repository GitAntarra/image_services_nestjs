import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Users } from 'src/entities/users.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async showAll(): Promise<ResponseDto<string, Users[]>> {
    return await this.userService.showAll();
  }
}
