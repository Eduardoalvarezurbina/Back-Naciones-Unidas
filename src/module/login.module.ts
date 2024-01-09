// auth.module.ts
import { Module } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { LoginController } from '../controller/login.controller';
import { UsuarioService } from '../service/usuario.service'; 
import { UsuarioModule } from './usuario.module'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuarioModule, 
    JwtModule.register({
      secret: '1234567',
      signOptions: { expiresIn: '1h' }, // duración de sesión
    }),
  ],
  providers: [LoginService, UsuarioService],
  controllers: [LoginController],
  exports: [LoginService], 
})
export class LoginModule {}