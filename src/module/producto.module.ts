import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from '../entity/producto.entity';
import { ProductoController } from '../controller/producto.controller';
import { ProductoService } from '../service/producto.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario.module';
//import { ProductoRepository } from './producto.repository';

@Module({
  imports: [UsuarioModule, JwtModule, TypeOrmModule.forFeature([ProductoEntity])],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}