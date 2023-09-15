import { ApiProperty } from "@nestjs/swagger";

export class CajasdelmesDto {
    @ApiProperty({ description:"Nombre de las cajas del mes", example:"Caja Navideña"})
    nombre: string;
}