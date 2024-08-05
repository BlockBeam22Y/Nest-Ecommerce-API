import {
  Body,
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
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UploadFileDto } from './dtos/uploadFile.dto';

@ApiTags('Files')
@Controller('files')
@SetPermissions(PermissionFlagsBits.UploadFiles)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'The token provided is invalid or has expired',
})
@ApiForbiddenResponse({
  description: 'UploadFiles permission is required to access this resource',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
  })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The image is uploaded successfully',
  })
  @ApiBadRequestResponse({
    description:
      'The file is too large, the format is not supported or the product could not be found',
  })
  async upload(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UploadFileDto,
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
