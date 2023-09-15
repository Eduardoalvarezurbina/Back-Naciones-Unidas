import { Module } from '@nestjs/common';
import { PaginaDeInicioController } from './pagina-de-inicio.controller';

@Module({
  controllers: [PaginaDeInicioController]
})
export class PaginaDeInicioModule {}
