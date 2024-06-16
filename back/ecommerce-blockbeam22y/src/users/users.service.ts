import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  get(): string {
    return 'Get Users';
  }
}
