import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async showAll(): Promise<ResponseDto<string, Users[]>> {
    const Users = await this.usersRepository.find();
    return new ResponseDto('Show All User', Users);
  }
}
