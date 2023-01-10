import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/User/Role.enum';
export const hasRoles = (...hasRoles: UserRole[]) =>
  SetMetadata('roles', hasRoles);
