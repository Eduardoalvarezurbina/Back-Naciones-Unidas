import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SuscripcionInputDto } from '../dto/suscripcion-input.dto';
import { SuscripcionOutputDto } from '../dto/suscripcion-output.dto';
import { SuscripcionService } from '../service/suscripcion.service';

@ApiTags('Suscripción')
@Controller('suscripcion')
export class SuscripcionController {
  private readonly logger = new Logger(SuscripcionController.name);
  constructor(private readonly suscripcionService: SuscripcionService) {}

  @Post()
  @ApiBody ({ type: SuscripcionInputDto, description: 'Datos para crear la nueva suscripción' })
  @ApiCreatedResponse({ description: 'Suscripción creada exitosamente', type: SuscripcionOutputDto })
  crearSuscripcion(@Body() suscripcionInputDto: SuscripcionInputDto): SuscripcionOutputDto {
    const nuevaSuscripcion=  this.suscripcionService.crearSuscripcion(suscripcionInputDto);
    this.logger.debug('Suscripción creada');
    return nuevaSuscripcion;
  }
}

