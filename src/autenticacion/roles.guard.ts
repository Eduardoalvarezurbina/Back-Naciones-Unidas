import { Injectable, ExecutionContext, CanActivate, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorador';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]); //Obtiene los roles requeridos para el endpoint
    if (!rolesRequeridos) { //Si no hay roles requeridos, retorna true
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const rolesUsuario = request.rolesUsuario; //Obtiene los roles del usuario

    const tienePermiso = rolesRequeridos.some(role => rolesUsuario.includes(role)); //Verifica si el usuario tiene los roles requeridos
    //console.log('tienePermiso: ', tienePermiso);
    //console.log('Rol del usuario:', rolesUsuario);
    //console.log('RolesRequeridos:', rolesRequeridos);

    if (!tienePermiso) { //Si no tiene permiso lanza una excepción
      throw new ForbiddenException('Validación incorrecta para confirmar el rol del usuario');
    }

    return true; //Retorna true si el usuario tiene los roles requeridos
  }
}