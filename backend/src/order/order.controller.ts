import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('order')
  async createOrder(@Body() orderItems: CreateOrderDto) {
    try {
      const result = await this.orderService.createOrder(orderItems);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
