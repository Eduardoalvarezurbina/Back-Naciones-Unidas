import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { InvitadoInputDto } from './dto/invitado-input.dto';
import { InvitadoOutputDto } from './dto/invitado-output.dto';
import { InvitadoService } from './invitado.service';

@ApiTags('Invitados')
@Controller('invitados')
export class InvitadoController {
  constructor(private readonly invitadoService: InvitadoService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Invitado creado exitosamente', type: InvitadoOutputDto })
  async crearInvitado(@Body() invitadoInputDto: InvitadoInputDto): Promise<InvitadoOutputDto> {
    try {
      const nuevoInvitado = await this.invitadoService.crearInvitado(invitadoInputDto);
      return nuevoInvitado.toDto();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lista de invitados', type: [InvitadoOutputDto] })
  async obtenerInvitados(): Promise<InvitadoOutputDto[]> {
    console.log('Inicio de obtenerInvitados'); 
    try {
      const invitados = await this.invitadoService.obtenerInvitados();
      console.log('Invitados obtenidos:', invitados); 
      await this.invitadoService.imprimirInvitados(); 
      return invitados.map((invitado) => invitado.toDto());
    } catch (error) {
      console.error('Error en obtenerInvitados:', error); 
      throw new BadRequestException(error.message);
    }
  }
}
