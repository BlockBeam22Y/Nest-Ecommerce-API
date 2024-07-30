import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCategoriesDto } from './dtos/createCategories.dto';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPublic } from 'src/decorators/public.decorator';
import PermissionsBitField from 'src/utils/PermissionsBitField';

@Controller('categories')
@UseGuards(AuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewCategories)
  async get(@Req() request) {
    const userRole: PermissionsBitField = request.user.role;

    return this.categoriesService.getCategories(
      userRole.has(PermissionsBitField.Flags.ViewProducts),
    );
  }

  @Post()
  @SetPermissions(PermissionFlagsBits.ManageCategories)
  async add(@Body() body: CreateCategoriesDto) {
    const { categoryNames } = body;

    const count = await this.categoriesService.addCategories(categoryNames);
    return {
      message: `Succesfully added ${count} new categories`,
    };
  }
}
