import { Body, Controller, Post, HttpCode, HttpStatus, Logger, HttpException, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/autenticacion/auth.guard';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';
import { Roles } from 'src/autenticacion/roles.decorador';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { ComentarioDTO } from 'src/dto/comentario.dto';
import { ComentarioEntity } from 'src/entity/comentario.entity';
import { ComentarioService } from 'src/service/comentario.service';


@ApiTags('Comentarios')
@Controller('comentario')
export class ComentarioController {
  private readonly logger = new Logger(ComentarioController.name);

  constructor(private readonly comentarioService: ComentarioService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @Roles('usuario')
  @Permisos('crear-comentario')
  @UseGuards(PermisosGuard)
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiBody({ type: ComentarioDTO, description: 'Datos para crear un nuevo comentario' })
  @ApiCreatedResponse({ description: 'Comentario creado exitosamente', type: ComentarioEntity })
  async crearComentario(@Body() comentarioDto: ComentarioDTO): Promise<ComentarioEntity> {
    try {
      this.logger.log('Creando un nuevo comentario');
      const comentario = await this.comentarioService.crearComentario(comentarioDto);
      this.logger.log('Comentario creado exitosamente');
      return comentario;
    } catch (error) {
      this.logger.error('Error al crear comentario', error.stack);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Hubo un error al crear el comentario',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':idProducto')
  @ApiOperation({ summary: 'Obtener los comentarios de un producto específico' })
  @ApiParam({ name: 'idProducto', description: 'ID del producto', example: 1 })
  @ApiOkResponse({ description: 'Comentarios obtenidos exitosamente', type: [ComentarioEntity] })
  async getComentariosPorProducto(@Param('idProducto', ParseIntPipe) idProducto: number): Promise<ComentarioEntity[]> {
  try {
    this.logger.log(`Obteniendo comentarios del producto con ID ${idProducto}`);
    const comentarios = await this.comentarioService.getComentariosPorProducto(idProducto);
    this.logger.log('Comentarios obtenidos exitosamente');
    return comentarios;
  } catch (error) {
    this.logger.error('Error al obtener comentarios', error.stack);
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Hubo un error al obtener los comentarios',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}