import { SetMetadata } from '@nestjs/common';

export enum Role {
  Usuario = 'usuario',
  Admin = 'administrador',
  Invitado = 'invitado'
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);