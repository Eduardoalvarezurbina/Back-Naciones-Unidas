import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CajasdelmesDto } from './dto/cajas-del-mes.dto';


@ApiTags('Cajas del mes')
@Controller('cajas-del-mes')
export class CajasDelMesController  {

    @Get()
    @ApiCreatedResponse({description: "Cajas del mes", type: CajasdelmesDto})
    //@ApiResponse({status:200, description: "Cajas del mes", type: CajasdelmesDto})
    getNombre(): CajasdelmesDto{
        return {nombre:"Cajas del mes"};
    }
}