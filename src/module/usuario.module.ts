import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioController } from '../controller/usuario.controller';
import { UsuarioEntity } from '../entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService, TypeOrmModule.forFeature([UsuarioEntity])],
})
export class UsuarioModule {}