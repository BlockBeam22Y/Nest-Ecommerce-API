import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'The image to be uploaded',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}
