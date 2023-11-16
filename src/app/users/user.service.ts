import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { Users } from 'src/entities/users.entity';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ResponseDto<string, Users>> {
    const { username, password, firstName, lastName } = createUserDto;
    // Check User Already Registred
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      throw new ConflictException(`Username ${username} already registred`);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersRepository.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const saveUser = await this.usersRepository.save(result);
    return new ResponseDto('New User Registred', saveUser);
  }

  async showAll(): Promise<ResponseDto<string, Users[]>> {
    const Users = await this.usersRepository.find();
    return new ResponseDto('Show All User', Users);
  }
}
