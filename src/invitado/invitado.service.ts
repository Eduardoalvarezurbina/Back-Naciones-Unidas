import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { validate } from 'class-validator';
import { InvitadoEntity } from './invitado.entity';
import { InvitadoInputDto } from './dto/invitado-input.dto';

@Injectable()
export class InvitadoService {
  constructor(
    @InjectRepository(InvitadoEntity)
    private readonly invitadoRepository: Repository<InvitadoEntity>,
  ) {}

  async crearInvitado(invitadoInputDto: InvitadoInputDto): Promise<InvitadoEntity> {
    const queryRunner = this.invitadoRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const invitado = this.invitadoRepository.create(invitadoInputDto);

      const errors = await validate(invitado);
      if (errors.length > 0) {
        throw new BadRequestException('Datos de invitado no válidos');
      }

      const result = await queryRunner.manager.save(InvitadoEntity, invitado);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`No se pudo crear el invitado. Detalles: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async obtenerInvitados(): Promise<InvitadoEntity[]> {
    console.log('Obteniendo invitados...');
    return await this.invitadoRepository.find();
  }

  async imprimirInvitados(): Promise<void> {
    const invitados = await this.obtenerInvitados();
    console.log('Invitados Registrados:');
    invitados.forEach((invitado, index) => {
      console.log(`[${index + 1}] Nombre: ${invitado.nombre_completo}, Correo: ${invitado.correo}`);
    });
  }
}