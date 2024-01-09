import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiHeader } from '@nestjs/swagger';
import { CajaService } from '../service/caja.service';
import { CajaDto } from '../dto/caja.dto';
import { CajaEntity } from '../entity/caja.entity';
import { Logger } from '@nestjs/common';
import { AuthGuard } from 'src/autenticacion/auth.guard';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { Roles } from 'src/autenticacion/roles.decorador';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';

@ApiTags('Caja')
@Controller('caja')
export class CajaController {
  private readonly logger = new Logger(CajaController.name);

  constructor(private readonly cajaService: CajaService) {}

  // Crear una nueva caja
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear una nueva caja', description: 'Este endpoint permite crear una nueva caja' })
  @ApiBody({ type: CajaDto, description: 'Datos de la caja a crear' })
  @ApiResponse({ status: 201, description: 'Caja creada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al crear la caja' })
  @Post()
  @Roles('administrador')
  @Permisos('crear-caja')
  @UseGuards(PermisosGuard)
  async crearCaja(@Body() cajaDto: CajaDto): Promise<CajaEntity> {
    this.logger.log('Creando una nueva caja');
    try {
      const { imagen1, imagen2, imagen3, ...restoCajaDto } = cajaDto;
      const imagePath = await this.cajaService.guardarImagen(cajaDto.nombreProducto, cajaDto.imagen1, cajaDto.imagen2, cajaDto.imagen3);
      const updatedCajaDto = {
        ...restoCajaDto,
        imagen1: imagePath.imagen1,
        imagen2: imagePath.imagen2,
        imagen3: imagePath.imagen3,
      };
      return await this.cajaService.crearCaja(updatedCajaDto);
    } catch (error) {
      this.logger.error('Error al crear la caja', error.stack);
      throw new HttpException('Error al crear la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener una caja por su ID
  
  @ApiOperation({ summary: 'Obtener una caja por su ID', description: 'Este endpoint permite obtener una caja por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la caja a obtener' })
  @ApiResponse({ status: 200, description: 'Caja encontrada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 404, description: 'Caja no encontrada' })
  @Get(':id')
  async obtenerCajaPorId(@Param('id') id: number): Promise<CajaEntity> {
    this.logger.log(`Obteniendo caja con ID ${id}`);
    try {
      return await this.cajaService.obtenerCajaPorId(id);
    } catch (error) {
      this.logger.error(`Error al obtener la caja con ID ${id}`, error.stack);
      throw new HttpException('Caja no encontrada', HttpStatus.NOT_FOUND);
    }
  }

  // Obtener todas las cajas
  @ApiOperation({ summary: 'Obtener todas las cajas', description: 'Este endpoint permite obtener todas las cajas' })
  @ApiResponse({ status: 200, description: 'Cajas obtenidas exitosamente', type: [CajaEntity] })
  @ApiResponse({ status: 500, description: 'Error al obtener las cajas' })
  @Get()
  async obtenerTodasLasCajas(): Promise<CajaEntity[]> {
    this.logger.log('Obteniendo todas las cajas');
    try {
      return await this.cajaService.obtenerTodasLasCajas();
    } catch (error) {
      this.logger.error('Error al obtener todas las cajas', error.stack);
      throw new HttpException('Error al obtener las cajas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Actualizar una caja por su ID
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar una caja por su ID', description: 'Este endpoint permite actualizar una caja por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la caja a actualizar' })
  @ApiBody({ type: CajaDto, description: 'Datos nuevos de la caja' })
  @ApiResponse({ status: 200, description: 'Caja actualizada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar la caja' })
  @Put(':id')
  @Roles('administrador')
  @Permisos('actualizar-caja')
  @UseGuards(PermisosGuard)
  async actualizarCaja(@Param('id') id: number, @Body() cajaDto: CajaDto): Promise<CajaEntity> {
    this.logger.log(`Actualizando caja con ID ${id}`);
    try {
      return await this.cajaService.actualizarCaja(id, cajaDto);
    } catch (error) {
      this.logger.error(`Error al actualizar la caja con ID ${id}`, error.stack);
      throw new HttpException('Error al actualizar la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // Actualizar parcialmente una caja por su ID
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar parcialmente una caja por su ID', description: 'Este endpoint permite actualizar parcialmente una caja por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la caja a actualizar parcialmente' })
  @ApiBody({ type: CajaDto, description: 'Datos nuevos de la caja' })
  @ApiResponse({ status: 200, description: 'Caja actualizada parcialmente exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar parcialmente la caja' })
  @Patch(':id')
  @Roles('administrador')
  @Permisos('actualizar-caja-parcialmente')
  @UseGuards(PermisosGuard)
  async actualizarParcialCaja(@Param('id') id: number, @Body() cajaDto: Partial<CajaDto>): Promise<CajaEntity> {
    this.logger.log(`Actualizando parcialmente caja con ID ${id}`);
    try {
      return await this.cajaService.actualizarParcialCaja(id, cajaDto);
    } catch (error) {
      this.logger.error(`Error al actualizar parcialmente la caja con ID ${id}`, error.stack);
      throw new HttpException('Error al actualizar parcialmente la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Eliminar una caja por su ID
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar una caja por su ID', description: 'Este endpoint permite eliminar una caja por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la caja a eliminar' })
  @ApiResponse({ status: 200, description: 'Caja eliminada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar la caja' })
  @Delete(':id')
  @Roles('administrador')
  @Permisos('eliminar-caja')
  @UseGuards(PermisosGuard)
  async eliminarCaja(@Param('id') id: number): Promise<void> {
    this.logger.log(`Eliminando caja con ID ${id}`);
    try {
      return await this.cajaService.eliminarCaja(id);
    } catch (error) {
      this.logger.error(`Error al eliminar la caja con ID ${id}`, error.stack);
      throw new HttpException('Error al eliminar la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}