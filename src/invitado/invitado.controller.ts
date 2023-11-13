import { Controller, Get, Post, Body } from '@nestjs/common';
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
    const nuevoInvitado = await this.invitadoService.crearInvitado(invitadoInputDto);
    return nuevoInvitado.toDto();
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lista de invitados', type: [InvitadoOutputDto] })
  async obtenerInvitados(): Promise<InvitadoOutputDto[]> {
    const invitados = await this.invitadoService.obtenerInvitados();
    return invitados.map((invitado) => invitado.toDto());
  }
}