import { ApiProperty } from "@nestjs/swagger";

export class CajasmisteriosasDto {
    @ApiProperty({ description:"Nombre de las cajas misteriosas", example:"Caja Premium"})
    nombre: string;
}