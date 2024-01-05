import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroDeComprasController } from './carro-de-compras.controller';
import { CarroDeComprasService } from './carro-de-compras.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProductoEntity } from 'src/producto/producto.entity';
import { CajaEntity } from 'src/caja/caja.entity';

@Module({
  imports: [
    UsuarioModule,
    JwtModule,
    TypeOrmModule.forFeature([ProductoEntity, CajaEntity]), // Agrega los entities al arreglo forFeature()
  ],
  controllers: [CarroDeComprasController],
  providers: [CarroDeComprasService, AuthGuard],
})
export class CarroDeComprasModule {}