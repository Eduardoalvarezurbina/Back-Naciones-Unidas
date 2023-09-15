import { ApiProperty } from "@nestjs/swagger";

export class SuscripcionDto {
    @ApiProperty({ description:"Tipos de suscripciones", example:"Suscripción mensual"})
    nombre: string;
}