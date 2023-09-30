import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CajasmisteriosasDto } from './dto/cajas-misteriosas.dto';
import { CajasmisteriosasInputDto } from './dto/cajas-misteriosas-input.dto';
import { CajasmisteriosasOutputDto } from './dto/cajas-misteriosas-output.dto';

@ApiTags('Cajas misteriosas')
@Controller('cajas-misteriosas')
export class CajasMisteriosasController {

  private cajasMisteriosas: CajasmisteriosasOutputDto[] = [
    {
      id: 1,
      nombre: 'Caja misteriosa 1',
      descripcion: 'Descripción de la caja misteriosa 1',
      precio: 10,
    },
    {
      id: 2,
      nombre: 'Caja misteriosa 2',
      descripcion: 'Descripción de la caja misteriosa 2',
      precio: 20,
    },
    {
      id: 3,
      nombre: 'Caja misteriosa 3',
      descripcion: 'Descripción de la caja misteriosa 3',
      precio: 30,
    },
  ];

  @Post()
  @ApiCreatedResponse({ description: 'Caja misteriosa creada exitosamente', type: CajasmisteriosasOutputDto })
  crearCajaMisteriosa(@Body() cajaMisteriosaInputDto: CajasmisteriosasInputDto): CajasmisteriosasOutputDto {
    const nuevaCajaMisteriosa: CajasmisteriosasOutputDto = {
      id: this.cajasMisteriosas.length + 1,
      nombre: cajaMisteriosaInputDto.nombre,
      descripcion: cajaMisteriosaInputDto.descripcion,
      precio: cajaMisteriosaInputDto.precio,
    };
    this.cajasMisteriosas.push(nuevaCajaMisteriosa);
    return nuevaCajaMisteriosa;
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lista de cajas misteriosas', type: [CajasmisteriosasOutputDto] })
  obtenerCajasMisteriosas(): CajasmisteriosasOutputDto[] {
    return this.cajasMisteriosas;
  }
}