import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    if (usuario && usuario.correo === 'admin@gmail.com') {
      return true;
    }

    throw new UnauthorizedException('No tienes permisos de administrador');
  }
}