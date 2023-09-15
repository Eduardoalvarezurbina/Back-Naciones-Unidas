import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SuscripcionDto } from './dto/suscripcion.dto';

@ApiTags('Suscripción')
@Controller('suscripcion')
export class SuscripcionController {
    
    @Get()
    @ApiCreatedResponse({description: "Cajas del mes", type: SuscripcionDto})
    getNombre(): SuscripcionDto{
        return {nombre:"Cajas misteriosas"};
    }
}

