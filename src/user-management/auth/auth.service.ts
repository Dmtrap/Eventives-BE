import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.users.findUnique({
       where: { email },
       include: {role:true}
      });


    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.status) {
      throw new ForbiddenException('Your account is inactive. Please contact support.');
    } 

    if (!user.role.status) {
      throw new ForbiddenException('Your role is inactive. Please contact support.');
    }

    const payload = { userId: user.id, email: user.email }; 
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
