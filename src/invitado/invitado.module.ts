import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadoController } from './invitado.controller';
import { InvitadoService } from './invitado.service';
import { InvitadoEntity } from './invitado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvitadoEntity])],
  controllers: [InvitadoController],
  providers: [InvitadoService],
})
export class InvitadoModule {}