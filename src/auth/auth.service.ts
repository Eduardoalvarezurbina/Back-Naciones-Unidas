// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(correo: string, pass: string): Promise<any> {
    const user: any = await this.usuarioService.findOneByCorreo(correo);
    if (user && (pass== user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Usuario o contraseña incorrecta');
    }
  }

  async login(user: any) {
    const payload = { correo: user.correo, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}