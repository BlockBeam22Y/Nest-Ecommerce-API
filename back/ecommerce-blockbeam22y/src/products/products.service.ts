import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  get(): string {
    return 'Get Products';
  }
}
