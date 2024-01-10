import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionEntity } from '../entity/suscripcion.entity';
import { SuscripcionService } from '../service/suscripcion.service';
import { SuscripcionController } from '../controller/suscripcion.controller';
import { UsuarioEntity } from 'src/entity/usuario.entity';
import { InvitadoEntity } from 'src/entity/invitado.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SuscripcionEntity, UsuarioEntity, InvitadoEntity])],
  providers: [SuscripcionService],
  controllers: [SuscripcionController],
  exports: [SuscripcionService, TypeOrmModule.forFeature([SuscripcionEntity])],
})
export class SuscripcionModule {}