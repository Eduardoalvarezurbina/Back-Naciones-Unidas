import { Module } from '@nestjs/common';
import { CajasMisteriosasController } from './cajas-misteriosas.controller';

@Module({
    controllers: [CajasMisteriosasController]
})
export class CajasMisteriosasModule {}
