import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  @ApiProperty({
    description: 'The ID of the user requesting the order',
    format: 'uuid',
  })
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @ApiProperty({
    description: 'The IDs of the products in the order',
    format: 'uuid',
  })
  products: string[];
}
