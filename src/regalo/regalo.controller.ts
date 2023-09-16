import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegaloDto } from './dto/regalo.dto';


    
@ApiTags('Regalo')
@Controller('regalo')
export class RegaloController  {

    @Get()
    @ApiCreatedResponse({description: "Regalos", type: RegaloDto})
    getNombre(): RegaloDto{
        return {nombre:"Regalo"};
    }
}

