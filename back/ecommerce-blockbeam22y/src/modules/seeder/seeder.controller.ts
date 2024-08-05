import { Controller, Put, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Seeder')
@Controller('seeder')
@SetPermissions(
  PermissionFlagsBits.ManageCategories,
  PermissionFlagsBits.ManageProducts,
)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'The token provided is invalid or has expired',
})
@ApiForbiddenResponse({
  description:
    'ManageCategories and ManageProducts permissions are required to access this resource',
})
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Put()
  @ApiOkResponse({
    description: 'Product and category data has been successfully reset',
  })
  @ApiConflictResponse({
    description: 'Some of the products are already included in an order',
  })
  async seed() {
    const [categoriesCount, productsCount] =
      await this.seederService.seedDatabase(true);

    return {
      message: `Successfully loaded ${categoriesCount} categories and ${productsCount} products`,
    };
  }
}
