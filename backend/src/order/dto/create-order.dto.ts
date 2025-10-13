import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  @Min(1)
  row: number;

  @IsNumber()
  @Min(1)
  seat: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export type CreateOrderDto = CreateOrderItemDto[];
