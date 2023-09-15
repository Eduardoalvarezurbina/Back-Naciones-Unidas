import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CajasmisteriosasDto } from './dto/cajas-misteriosas.dto';

@ApiTags('Cajas misteriosas')
@Controller('cajas-misteriosas')
export class CajasMisteriosasController  {

    @Get()
    @ApiCreatedResponse({description: "Cajas del mes", type: CajasmisteriosasDto})
    getNombre(): CajasmisteriosasDto{
        return {nombre:"Cajas misteriosas"};
    }
}
