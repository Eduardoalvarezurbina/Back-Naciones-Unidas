import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InvitadoInputDto } from '../dto/invitado-input.dto';
import { InvitadoOutputDto } from '../dto/invitado-output.dto';
import { InvitadoService } from '../service/invitado.service';
import { Roles } from 'src/autenticacion/roles.decorador';
import { AuthGuard } from 'src/autenticacion/auth.guard';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';


@ApiTags('Invitado')
@Controller('invitado')
export class InvitadoController {
  private readonly logger = new Logger ('InvitadoController');
  constructor(private readonly invitadoService: InvitadoService) {}

  @ApiCreatedResponse({ description: 'Datos de invitados guardados correctamente', type: InvitadoOutputDto })
  @ApiOperation({ summary: 'Crear invitado' })
  @Post()
  async crearInvitado(@Body() invitadoInputDto: InvitadoInputDto): Promise<InvitadoOutputDto> {
    try {
      this.logger.debug('crear Invitado');
      const invitado = await this.invitadoService.crearInvitado(invitadoInputDto);
      return invitado;
    } catch (error) {
      this.logger.error('Error en crearInvitado:', error);
      throw new BadRequestException('Error al crear el invitado');
    }
  }

  @ApiCreatedResponse({ description: 'Lista de invitados', type: [InvitadoOutputDto] })
  @ApiOperation({ summary: 'Obtener la lista de invitados' })
  @Get()
  async obtenerInvitados(): Promise<InvitadoOutputDto[]> {
    try {
      this.logger.debug('obtener Invitados');
      const invitados = await this.invitadoService.obtenerInvitados();
      
      return invitados;
    } catch (error) {
      this.logger.error('Error en obtenerInvitados:', error);
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'eliminar un invitado' })
  @Delete(':id')
  @Roles('administrador')
  @Permisos('eliminar-invitado')
  @UseGuards(PermisosGuard)
  async eliminarInvitado(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      this.logger.debug('eliminar Invitado');
      await this.invitadoService.eliminarInvitado(id);
    } catch (error) {
      this.logger.error('Error en eliminarInvitado:', error);
      throw new BadRequestException(error.message);
    }
  }
}