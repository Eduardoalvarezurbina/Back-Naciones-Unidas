import { ApiProperty } from '@nestjs/swagger';

export class ProductoInputDto {
  @ApiProperty()
  readonly nombre: string;

  @ApiProperty()
  readonly categoria: string;

  @ApiProperty()
  readonly descripcion: string;

  @ApiProperty()
  readonly precio: number;

  @ApiProperty()
  readonly imagen: string;

  
}