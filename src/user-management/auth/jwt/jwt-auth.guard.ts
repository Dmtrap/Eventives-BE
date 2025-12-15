import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtSecret } from '../auth.module';
import { Constants } from 'src/auth/constans/constans';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token){
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verify(token, {
          secret: Constants.secret,
        });
        request['user'] = payload;
      } catch (err) {
        throw new HttpException(err, 401);
      }
      return true;
    }

      private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
  }
