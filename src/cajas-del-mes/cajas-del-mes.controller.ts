import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cajas del mes')
@Controller('cajas-del-mes')
export class CajasDelMesController  {

    @Get()
    getNombre():string {
        return "Cajas del mes"
    }
}