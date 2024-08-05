import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCategoriesDto } from './dtos/createCategories.dto';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPublic } from 'src/decorators/public.decorator';
import PermissionsBitField from 'src/utils/PermissionsBitField';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewCategories)
  @ApiOkResponse({
    description: 'The categories are retrieved successfully',
  })
  @ApiForbiddenResponse({
    description:
      'ViewCategories permission is required to access this resource',
  })
  async get(@Req() request) {
    const userRole: PermissionsBitField = request.user.role;

    return this.categoriesService.getCategories(
      userRole.has(PermissionsBitField.Flags.ViewProducts),
    );
  }

  @Post()
  @SetPermissions(PermissionFlagsBits.ManageCategories)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The categories are created successfully',
  })
  @ApiBadRequestResponse({
    description: 'The data provided is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'The token provided is invalid or has expired',
  })
  @ApiForbiddenResponse({
    description:
      'ManageCategories permission is required to access this resource',
  })
  async add(@Body() body: CreateCategoriesDto) {
    const { categoryNames } = body;

    const count = await this.categoriesService.addCategories(categoryNames);
    return {
      message: `Succesfully added ${count} new categories`,
    };
  }
}
