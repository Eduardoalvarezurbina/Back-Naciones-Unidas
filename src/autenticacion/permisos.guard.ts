import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PERMISOS_KEY } from './permisos.decorador';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permisosRequeridos = this.reflector.getAllAndOverride<string[]>(PERMISOS_KEY, [context.getHandler(), context.getClass()]); //Obtiene los permisos requeridos para el endpoint 
    if (!permisosRequeridos) { //Si no hay permisos requeridos, retorna true
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const permisosPorRol = {//Define los permisos por rol
      administrador: [
         'crear-producto', 'eliminar-producto', 'actualizar-producto', 'actualizar-producto-parcialmente', 'confirmar-carrito', 'ver-carrito', 'descontar-stock', 'crear-caja', 'actualizar-caja', 'actualizar-caja-parcialmente', 'eliminar-caja', 'eliminar-invitado', 'eliminar-usuario', 'crear-suscripcion',
         'crear-caja', 'crear-comentario', 'actualizar-caja', 'actualizar-caja-parcialmente', 'eliminar-caja', 'eliminar-invitado', 'eliminar-usuario', 'crear-suscripcion'
      ],
      usuario: [
        'confirmar-carrito', 'ver-carrito', 'descontar-stock', 'crear-suscripcion', 'crear-comentario'],
      invitado: [
        'confirmar-carrito', 'ver-carrito', 'descontar-stock', 'crear-suscripcion'
      ]
    };

    try {
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: '1234567' }); //Decodifica el token
      const usuario = decodedToken.correo; //Obtiene el correo 
      
      let rolUsuario;
      if (usuario === 'admin@gmail.com') {
        rolUsuario = 'administrador';
      } else if (usuario) {
        rolUsuario = 'usuario';
      } else if (decodedToken.invitado) {
        rolUsuario = 'invitado';
      }
    
      const permisosUsuario = permisosPorRol[rolUsuario]; //Obtiene los permisos del usuario
      const tienePermiso = permisosRequeridos.every(permiso => permisosUsuario.includes(permiso)); //Verifica si el usuario tiene los permisos requeridos
      if (!tienePermiso) { //Si no tiene permiso lanza una excepción
        throw new ForbiddenException('No tienes el permiso adecuado para acceder a esta página');
      }
    
      return tienePermiso; //Retorna true si el usuario tiene los permisos requeridos.
    
    } catch (error) {
      
      throw new UnauthorizedException('No tiene permiso para realizar esta acción');
    }
  }
}