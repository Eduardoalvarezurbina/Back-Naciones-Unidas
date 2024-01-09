import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InvitadoEntity } from '../entity/invitado.entity';
import { InvitadoInputDto } from '../dto/invitado-input.dto';
import { validate } from 'class-validator';

@Injectable()
export class InvitadoService {
  private readonly logger = new Logger('InvitadoService');
  constructor(
    @InjectRepository(InvitadoEntity)
    private readonly invitadoRepository: Repository<InvitadoEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async crearInvitado(invitadoInputDto: InvitadoInputDto): Promise<any> {
    this.logger.debug('Crear invitado');
    const invitado = new InvitadoEntity();
    // Asignar los valores del DTO al objeto invitado
    invitado.nombreCompleto = invitadoInputDto.nombreCompleto;
    invitado.rut = invitadoInputDto.rut;
    invitado.correo= invitadoInputDto.correo;
    invitado.region = invitadoInputDto.region;
    invitado.comuna = invitadoInputDto.comuna;
    invitado.direccion = invitadoInputDto.direccion;
    invitado.celular = invitadoInputDto.celular;
    invitado.referencia = invitadoInputDto.referencia;

    const errors = await validate(invitado);
    if (errors.length > 0) {
      this.logger.error('Error en crearInvitado:', errors);
      throw new BadRequestException('Datos de invitado no válidos');
    }

    const invitadoGuardado = await this.invitadoRepository.save(invitado); // Guardar el invitado en la base de datos
    const payload = { invitado: true, id: invitadoGuardado.id }; // Crear el payload para el token
    const token = this.jwtService.sign(payload, { secret: '1234567', expiresIn:'15m' }); // crear el token con el payload y la clave secreta
    
    this.logger.debug('Invitado creado');
    return { ...invitadoGuardado, token }; //  Devolver el invitado creado junto con el token
  }

  async obtenerInvitados(): Promise<InvitadoEntity[]> {
    this.logger.debug('Obtener invitados');
    return this.invitadoRepository.find();
  }

  async obtenerInvitadoPorId(id: number): Promise<InvitadoEntity> {
    this.logger.debug('Obtener invitado por id');
    return this.invitadoRepository.findOne({ where: { id } });
  }

  async eliminarInvitado(id: number): Promise<void> {
    this.logger.debug('Eliminar invitado');
    const invitado = await this.obtenerInvitadoPorId(id);
    if (!invitado) {
      this.logger.error('Error en eliminarInvitado:', 'Invitado no encontrado');
      throw new BadRequestException('Invitado no encontrado');
    }

    await this.invitadoRepository.remove(invitado);
    this.logger.debug('Invitado eliminado');
  }
}