import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from 'src/utils/response/response.dto';
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { Users } from 'src/entities/users.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDto<string, Users>> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async showAll(): Promise<ResponseDto<string, Users[]>> {
    return await this.userService.showAll();
  }
}
