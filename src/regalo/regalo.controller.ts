import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegaloDto } from './dto/regalo.dto';


    
@ApiTags('Cajas del mes')
@Controller('cajas-del-mes')
export class RegaloController  {

    @Get()
    @ApiCreatedResponse({description: "Regalos", type: RegaloDto})
    getNombre(): RegaloDto{
        return {nombre:"Regalo"};
    }
}

