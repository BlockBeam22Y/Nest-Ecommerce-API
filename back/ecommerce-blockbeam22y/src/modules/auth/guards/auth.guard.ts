import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/config/envs';
import { Roles } from 'src/utils/PermissionsBitField';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization ?? '';

    const [, token] = authorization.split('Bearer ');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.role = payload.isAdmin ? Roles.Admin : Roles.User;

      request.user = payload;

      return true;
    } catch {
      if (isPublic) {
        request.user = {
          role: Roles.Guest,
        };

        return true;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
