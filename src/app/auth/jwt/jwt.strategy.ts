import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './payload.interface';
import { Users } from 'src/entities/users.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<any> {
    const { username } = jwtPayload;

    const user: Users = await this.authService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
