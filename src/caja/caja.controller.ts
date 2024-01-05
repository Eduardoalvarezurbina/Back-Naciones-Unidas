import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CajaService } from './caja.service';
import { CajaDto } from './dto/caja.dto';
import { CajaEntity } from './caja.entity';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard} from '../auth/auth.guard';

@ApiTags('Caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @ApiOperation({ summary: 'Crear una nueva caja' })
  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: CajaDto })
  @ApiResponse({ status: 201, description: 'Caja creada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al crear la caja' })
  async crearCaja(@Body() cajaDto: CajaDto): Promise<CajaEntity> {
    try {
      return await this.cajaService.crearCaja(cajaDto);
    } catch (error) {
      throw new HttpException('Error al crear la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Obtener una caja por su ID' })
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Caja encontrada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 404, description: 'Caja no encontrada' })
  async obtenerCajaPorId(@Param('id') id: number): Promise<CajaEntity> {
    try {
      return await this.cajaService.obtenerCajaPorId(id);
    } catch (error) {
      throw new HttpException('Caja no encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Obtener todas las cajas' })
  @Get()
  @ApiResponse({ status: 200, description: 'Cajas obtenidas exitosamente', type: [CajaEntity] })
  @ApiResponse({ status: 500, description: 'Error al obtener las cajas' })
  async obtenerTodasLasCajas(): Promise<CajaEntity[]> {
    try {
      return await this.cajaService.obtenerTodasLasCajas();
    } catch (error) {
      throw new HttpException('Error al obtener las cajas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Actualizar una caja por su ID' })
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: CajaDto })
  @ApiResponse({ status: 200, description: 'Caja actualizada exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar la caja' })
  async actualizarCaja(@Param('id') id: number, @Body() cajaDto: CajaDto): Promise<CajaEntity> {
    try {
      return await this.cajaService.actualizarCaja(id, cajaDto);
    } catch (error) {
      throw new HttpException('Error al actualizar la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Actualizar parcialmente una caja por su ID' })
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: CajaDto })
  @ApiResponse({ status: 200, description: 'Caja actualizada parcialmente exitosamente', type: CajaEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar parcialmente la caja' })
  async actualizarParcialCaja(@Param('id') id: number, @Body() cajaDto: Partial<CajaDto>): Promise<CajaEntity> {
    try {
      return await this.cajaService.actualizarParcialCaja(id, cajaDto);
    } catch (error) {
      throw new HttpException('Error al actualizar parcialmente la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Eliminar una caja por su ID' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 200, description: 'Caja eliminada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar la caja' })
  async eliminarCaja(@Param('id') id: number): Promise<void> {
    try {
      return await this.cajaService.eliminarCaja(id);
    } catch (error) {
      throw new HttpException('Error al eliminar la caja', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}