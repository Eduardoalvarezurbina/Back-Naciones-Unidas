import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { InvitadoController } from '../controller/invitado.controller';
import { InvitadoService } from '../service/invitado.service';
import { InvitadoEntity } from '../entity/invitado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitadoEntity]),
    JwtModule.register({
      secret: '1234567',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [InvitadoController],
  providers: [InvitadoService],
})
export class InvitadoModule {}