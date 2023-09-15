import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cajas misteriosas')
@Controller('cajas-misteriosas')
export class CajasMisteriosasController  {

    @Get()
    getNombre():string {
        return "Cajas Misteriosas"
    }
}
