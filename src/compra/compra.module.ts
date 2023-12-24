import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { ProductoEntity } from '../producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}