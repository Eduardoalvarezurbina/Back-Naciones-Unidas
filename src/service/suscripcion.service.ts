import { Injectable, Logger } from '@nestjs/common';
import { SuscripcionInputDto } from '../dto/suscripcion-input.dto';
import { SuscripcionOutputDto } from '../dto/suscripcion-output.dto';

@Injectable()
export class SuscripcionService {
    private readonly logger = new Logger(SuscripcionService.name);
  crearSuscripcion(suscripcionInputDto: SuscripcionInputDto): SuscripcionOutputDto {
    this.logger.debug('Creando suscripción');
    const fechaInicio = new Date();
    const fechaFin = new Date();
    fechaFin.setMonth(fechaInicio.getMonth() + suscripcionInputDto.mesesDuracion);

    const nuevaSuscripcion: SuscripcionOutputDto = {
      nombre: suscripcionInputDto.nombre,
      mesesDuracion: suscripcionInputDto.mesesDuracion,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    };
    this.logger.debug('Suscripción creada');
    return nuevaSuscripcion;
  }
}