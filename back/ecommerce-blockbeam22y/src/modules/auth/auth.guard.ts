import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

const validateAuth = async (authorization: string) => {
  const [email, password, ...rest] = authorization.split(':');

  return (
    typeof email === 'string' &&
    /^([a-z0-9][-_\.]?)*[a-z0-9]@([a-z][-\.]?)*[a-z]\.[a-z]{2,4}$/.test(
      email,
    ) &&
    typeof password === 'string' &&
    rest.length === 0
  );
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    return authorization && validateAuth(authorization);
  }
}
