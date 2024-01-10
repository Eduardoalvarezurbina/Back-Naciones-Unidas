import { Module } from '@nestjs/common';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioController } from '../controller/comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioEntity } from '../entity/comentario.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';
import { ProductoEntity } from 'src/entity/producto.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([ComentarioEntity, UsuarioEntity, ProductoEntity])],
  providers: [ComentarioService],
  controllers: [ComentarioController],
  exports: [ComentarioService], 
})
export class ComentarioModule {}