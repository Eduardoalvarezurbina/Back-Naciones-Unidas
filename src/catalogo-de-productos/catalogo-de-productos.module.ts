import { Module } from '@nestjs/common';
import { CatalogoDeProductosController } from './catalogo-de-productos.controller';

@Module({
  controllers: [CatalogoDeProductosController]
})
export class CatalogoDeProductosModule {}
