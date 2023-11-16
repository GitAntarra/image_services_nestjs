import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/utils/response/response.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from 'src/dto/users/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseDto<string, any>> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user || !passwordValid) {
      throw new NotAcceptableException('could not find the user');
    }

    const payload: JwtPayload = { username: user.username };
    const token = this.jwtService.sign(payload);

    return new ResponseDto('Login Success', { user, token });
  }

  async Register(
    createUserDto: CreateUserDto,
  ): Promise<ResponseDto<string, Users>> {
    const { username, password, firstName, lastName } = createUserDto;
    // Check User Already Registred
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new ConflictException(`Username ${username} already registred`);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userRepository.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const saveUser = await this.userRepository.save(result);
    return new ResponseDto('New User Registred', saveUser);
  }

  async getUserByUsername(username: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
