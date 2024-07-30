import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import PermissionsBitField from 'src/utils/PermissionsBitField';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const permissions = this.reflector.getAllAndOverride<bigint[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const role: PermissionsBitField = request.user.role;

    return role.has(permissions);
  }
}
