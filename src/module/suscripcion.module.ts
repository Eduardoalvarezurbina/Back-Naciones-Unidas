import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionEntity } from '../entity/suscripcion.entity';
import { SuscripcionService } from '../service/suscripcion.service';
import { SuscripcionController } from '../controller/suscripcion.controller';


@Module({
  imports: [TypeOrmModule.forFeature([SuscripcionEntity])],
  providers: [SuscripcionService],
  controllers: [SuscripcionController],
  exports: [SuscripcionService, TypeOrmModule.forFeature([SuscripcionEntity])],
})
export class SuscripcionModule {}