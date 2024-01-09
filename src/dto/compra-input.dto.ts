import { ApiProperty } from '@nestjs/swagger';

export class CompraInputDTO {
  
  @ApiProperty({ 
    description: 'Método de pago utilizado para la compra', 
    example: 'WebPay' 
  })
  metodoPago: string;
  
  @ApiProperty({ 
    description: 'Total pagado en la compra', 
    example: 100990 
  })
  totalPagado: number;

}