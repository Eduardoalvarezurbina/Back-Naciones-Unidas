import { ApiProperty } from "@nestjs/swagger";

export class RegaloDto {
    @ApiProperty({ description:"Regalos", example:"Regalo de cumpleaños"})
    nombre: string;
}