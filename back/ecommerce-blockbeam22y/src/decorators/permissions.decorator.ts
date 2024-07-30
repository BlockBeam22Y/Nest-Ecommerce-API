import { SetMetadata } from '@nestjs/common';

export const SetPermissions = (...permissions: bigint[]) =>
  SetMetadata('permissions', permissions);
