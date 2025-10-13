//TODO реализовать DTO для /orders
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsDateString()
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

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

export class OrderItemResponseDto extends CreateOrderItemDto {
  @IsUUID()
  id: string;
}

export class OrderResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}
