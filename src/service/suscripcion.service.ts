import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SuscripcionInputDto } from 'src/dto/suscripcion-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/entity/usuario.entity';
import { SuscripcionEntity } from 'src/entity/suscripcion.entity';
import { InvitadoEntity } from 'src/entity/invitado.entity';
import { SuscripcionOutputDto } from 'src/dto/suscripcion-output.dto';

@Injectable()
export class SuscripcionService {
  private readonly logger = new Logger(SuscripcionService.name);

  constructor(
    @InjectRepository(SuscripcionEntity)
    private suscripcionRepository: Repository<SuscripcionEntity>,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(InvitadoEntity)
    private invitadoRepository: Repository<InvitadoEntity>,
  ) {}

  async crearSuscripcion(suscripcionInputDto: SuscripcionInputDto, idUsuario: number, idInvitado: number): Promise<SuscripcionOutputDto> {
    console.log(`idUsuario: ${idUsuario}, idInvitado: ${idInvitado}`); 
    this.logger.debug('Creando suscripción');
    const fechaInicio = new Date();
    const fechaFin = new Date();
    fechaFin.setMonth(fechaInicio.getMonth() + suscripcionInputDto.mesesDuracion);

    const usuario = await this.usuarioRepository.findOne({ where: { id: idUsuario } });
    const invitado = await this.invitadoRepository.findOne({ where: { id: idInvitado } });

    const nuevaSuscripcion = new SuscripcionEntity();
    nuevaSuscripcion.mesesDuracion = suscripcionInputDto.mesesDuracion;
    nuevaSuscripcion.fechaInicio = fechaInicio;
    nuevaSuscripcion.fechaFin = fechaFin;
    nuevaSuscripcion.usuario = usuario;
    nuevaSuscripcion.invitado = invitado;

    await this.suscripcionRepository.save(nuevaSuscripcion);

    const suscripcionOutputDto: SuscripcionOutputDto = {
      mesesDuracion: nuevaSuscripcion.mesesDuracion,
      fechaInicio: nuevaSuscripcion.fechaInicio,
      fechaFin: nuevaSuscripcion.fechaFin,
      // Asegúrate de agregar los campos de usuario e invitado a tu SuscripcionOutputDto si es necesario
    };
    this.logger.debug('Suscripción creada');
    return suscripcionOutputDto;
  }
}