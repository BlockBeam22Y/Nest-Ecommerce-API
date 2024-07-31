import { Controller, Put, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';

@Controller('seeder')
@SetPermissions(
  PermissionFlagsBits.ManageCategories,
  PermissionFlagsBits.ManageProducts,
)
@UseGuards(AuthGuard, RolesGuard)
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Put()
  async seed() {
    const [categoriesCount, productsCount] =
      await this.seederService.seedDatabase(true);

    return {
      message: `Successfully loaded ${categoriesCount} categories and ${productsCount} products`,
    };
  }
}
