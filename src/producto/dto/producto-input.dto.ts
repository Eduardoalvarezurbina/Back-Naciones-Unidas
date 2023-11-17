import { ApiProperty } from '@nestjs/swagger';

export class ProductoInputDto {
  @ApiProperty()
  readonly nombre: string;

  @ApiProperty()
  readonly descripcion: string;

  @ApiProperty()
  readonly precio: number;
}