import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitadoEntity } from './invitado.entity';
import { InvitadoInputDto } from './dto/invitado-input.dto';
import { validate } from 'class-validator';

@Injectable()
export class InvitadoService {
  constructor(
    @InjectRepository(InvitadoEntity)
    private readonly invitadoRepository: Repository<InvitadoEntity>,
  ) {}

  async crearInvitado(invitadoInputDto: InvitadoInputDto): Promise<InvitadoEntity> {
    const invitado = new InvitadoEntity();
    // Asignar los valores del DTO al objeto invitado
    invitado.nombre_completo = invitadoInputDto.nombre_completo;
    invitado.region = invitadoInputDto.region;
    invitado.comuna = invitadoInputDto.comuna;
    invitado.calle_y_numero = invitadoInputDto.calle_y_numero;
    invitado.celular = invitadoInputDto.celular;
    invitado.correo = invitadoInputDto.correo;
    invitado.informacion_adicional = invitadoInputDto.informacion_adicional;

    const errors = await validate(invitado);
    if (errors.length > 0) {
      throw new BadRequestException('Datos de invitado no válidos');
    }

    return this.invitadoRepository.save(invitado);
  }

  async obtenerInvitados(): Promise<InvitadoEntity[]> {
    return this.invitadoRepository.find();
  }

  async obtenerInvitadoPorId(id: number): Promise<InvitadoEntity> {
    return this.invitadoRepository.findOne({ where: { id } });
  }

  async eliminarInvitado(id: number): Promise<void> {
    const invitado = await this.obtenerInvitadoPorId(id);
    if (!invitado) {
      throw new BadRequestException('Invitado no encontrado');
    }

    await this.invitadoRepository.remove(invitado);
  }
}