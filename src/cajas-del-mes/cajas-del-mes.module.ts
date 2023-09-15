import { Module } from '@nestjs/common';
import { CajasDelMesController } from './cajas-del-mes.controller';

@Module({
    controllers: [CajasDelMesController]
})
export class CajasDelMesModule {}
