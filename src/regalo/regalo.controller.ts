import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegaloDto } from './dto/regalo.dto';
import { RegaloInputDto } from './dto/regalo-input.dto';
import { RegaloOutputDto } from './dto/regalo-output.dto';

@ApiTags('Regalo')
@Controller('regalo')
export class RegaloController {

  @Post()
  @ApiCreatedResponse({ description: 'Regalo creado exitosamente', type: RegaloOutputDto })
  crearRegalo(@Body() regaloInputDto: RegaloInputDto): RegaloOutputDto {
    const nuevoRegalo: RegaloOutputDto = {
      id: 1,
      nombre: regaloInputDto.nombre,
      descripcion: regaloInputDto.descripcion,
      precio: regaloInputDto.precio,
    };
    return nuevoRegalo;
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lista de cajas regalos', type: [RegaloOutputDto] })
  obtenerRegalos(): RegaloOutputDto[] {
    const regalos: RegaloOutputDto[] = [
      {
        id: 1,
        nombre: 'Regalo caja 1',
        descripcion: 'Descripción de caja regalo 1',
        precio: 10,
      },
      {
        id: 2,
        nombre: 'Regalo caja 2',
        descripcion: 'Descripción del caja regalo 2',
        precio: 20,
      },
      {
        id: 3,
        nombre: 'Regalo caja 3',
        descripcion: 'Descripción de caja regalo 3',
        precio: 30,
      },
    ];
    return regalos;
  }
}