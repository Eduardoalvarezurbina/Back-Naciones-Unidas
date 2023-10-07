import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
//import { SuscripcionDto } from './dto/suscripcion.dto';
import { SuscripcionInputDto } from './dto/suscripcion-input.dto';
import { SuscripcionOutputDto } from './dto/suscripcion-output.dto';

export class SuscripcionDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;
}
@ApiTags('Suscripción')
@Controller('suscripcion')
export class SuscripcionController {

  @Post()
  @ApiCreatedResponse({ description: 'Suscripción creada exitosamente', type: SuscripcionOutputDto })
  crearSuscripcion(@Body() suscripcionInputDto: SuscripcionInputDto): SuscripcionOutputDto {
    const nuevaSuscripcion: SuscripcionOutputDto = {
      id: 1,
      nombre: suscripcionInputDto.nombre,
      email: suscripcionInputDto.email,
      fechaInicio: new Date(),
      fechaFin: new Date(),
    };
    return nuevaSuscripcion;
  }


    
    @Get()
    @ApiCreatedResponse({description: "Suscripcion", type: SuscripcionDto})
    getNombre(): SuscripcionDto{
        return {nombre:"Suscripcion"};
    }
}


