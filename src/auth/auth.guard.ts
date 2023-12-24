import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(private jwtService: JwtService, private usuarioService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.access_token;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: '1234567' });
      const usuario = await this.usuarioService.findOneByCorreo(payload.correo);
      request['INFO'] = { payload, nombreUsuario: usuario.nombre}; 
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}