import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[] | null) => SetMetadata('roles', roles);
