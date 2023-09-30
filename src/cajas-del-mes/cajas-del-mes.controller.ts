import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CajasDelMesInputDto } from './dto/cajas-del-mes-input.dto';
import { CajasDelMesOutputDto } from './dto/cajas-del-mes-output.dto';

@ApiTags('Cajas del mes')
@Controller('cajas-del-mes')
export class CajasDelMesController  {

    @Get()
    @ApiCreatedResponse({ description: 'Cajas del mes', type: CajasDelMesOutputDto })
    getNombre(): CajasDelMesOutputDto {
        return { id: 1, nombre: 'Caja Navideña', descripcion: 'Una caja llena de sorpresas navideñas', precio: 50 };
    }

    @Post()
  @ApiCreatedResponse({ description: 'Caja del mes creada exitosamente', type: CajasDelMesOutputDto })
  crearCajaDelMes(@Body() cajasDelMesInputDto: CajasDelMesInputDto): CajasDelMesOutputDto {
    const nuevaCajaDelMes: CajasDelMesOutputDto = {
      id: 1,
      nombre: cajasDelMesInputDto.nombre,
      descripcion: cajasDelMesInputDto.descripcion,
      precio: cajasDelMesInputDto.precio,
    };
    return nuevaCajaDelMes;
  }

}
