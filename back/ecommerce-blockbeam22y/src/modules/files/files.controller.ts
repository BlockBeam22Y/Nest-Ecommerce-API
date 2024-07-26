import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpe?g|img|png|webp)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: 200 * 1000,
            message: 'Image must be smaller than 200KB',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadImage(id, file);
  }
}
