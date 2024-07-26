import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/config/envs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Bearer token not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [method, token] = authorization.split(' ');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
