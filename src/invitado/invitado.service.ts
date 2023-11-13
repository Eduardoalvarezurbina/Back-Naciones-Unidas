import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitadoEntity } from './invitado.entity';
import { InvitadoInputDto } from './dto/invitado-input.dto';
import { InvitadoOutputDto } from './dto/invitado-output.dto';

@Injectable()
export class InvitadoService {
  constructor(
    @InjectRepository(InvitadoEntity)
    private readonly invitadoRepository: Repository<InvitadoEntity>,
  ) {}

  async crearInvitado(invitadoInputDto: InvitadoInputDto): Promise<InvitadoEntity> {
    const invitado = this.invitadoRepository.create(invitadoInputDto);
    return await this.invitadoRepository.save(invitado);
  }

  async obtenerInvitados(): Promise<InvitadoEntity[]> {
    return await this.invitadoRepository.find();
  }
}