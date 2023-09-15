import { Module } from '@nestjs/common';
import { CarroDeComprasController } from './carro-de-compras.controller';

@Module({
  controllers: [CarroDeComprasController]
})
export class CarroDeComprasModule {}
