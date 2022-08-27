import { SetMetadata } from '@nestjs/common';

const ROLES_KEY = 'roles';
const Role = (role: string) => SetMetadata(ROLES_KEY, role);

export { ROLES_KEY, Role }