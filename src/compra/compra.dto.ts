import { ProductoCarroDto } from "src/carro-de-compras/dto/carro-de-compras.dto";

export class CompraDto {
    
    mediodepago: string;
    productos: ProductoCarroDto[];
  }