import { Module } from '@nestjs/common';
import { SuscripcionController } from './suscripcion.controller';

@Module({
    controllers:[SuscripcionController]
})
export class SuscripcionModule {}
