import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/user-management/users/users.service';
import { jwtSecret } from '../auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { userId: number }) {
    console.log('Payload:', payload);
  
    const user = await this.usersService.getUserById(payload.userId);
  
    if (!user) {
      throw new UnauthorizedException();
    }
  
    return user;
  }
  
}