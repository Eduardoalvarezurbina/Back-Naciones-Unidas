import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroDeComprasController } from './carro-de-compras.controller';
import { CarroDeComprasService } from './carro-de-compras.service';
import { CarroDeComprasRepository } from './carro-de-compras.repository';
import { ProductoRepository } from '../producto/producto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarroDeComprasRepository, ProductoRepository])],
  controllers: [CarroDeComprasController],
  providers: [CarroDeComprasService],
})
export class CarroDeComprasModule {}