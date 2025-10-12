import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { FilmsRepository } from 'src/repository/afisha.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderItems: CreateOrderDto) {
    const results = [];

    for (const item of orderItems) {
      const result = await this.processOrderItem(item);
      results.push(result);
    }

    return {
      total: results.length,
      items: results,
    };
  }

  private async processOrderItem(item: CreateOrderItemDto) {
    // Находим фильм
    const film = await this.filmsRepository.findById(item.film);
    if (!film) {
      throw new BadRequestException(`Film with id ${item.film} not found`);
    }

    // Находим сеанс
    const session = film.schedule.find((s) => s.id === item.session);
    if (!session) {
      throw new BadRequestException(
        `Session with id ${item.session} not found`,
      );
    }

    // Проверяем валидность ряда и места
    if (item.row > session.rows || item.row < 1) {
      throw new BadRequestException(
        `Invalid row: ${item.row}. Available: 1-${session.rows}`,
      );
    }

    if (item.seat > session.seats || item.seat < 1) {
      throw new BadRequestException(
        `Invalid seat: ${item.seat}. Available: 1-${session.seats}`,
      );
    }

    // Проверяем, не занято ли место
    const seatKey = `${item.row}:${item.seat}`;
    if (session.taken.includes(seatKey)) {
      throw new BadRequestException(`Seat ${seatKey} is already taken`);
    }

    // Бронируем место
    await this.filmsRepository.reserveSeat(item.film, item.session, seatKey);

    // Возвращаем билет с ID
    return {
      ...item,
      id: this.generateTicketId(),
    };
  }

  private generateTicketId(): string {
    return (
      'urn:uuid:' +
      Array.from({ length: 36 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join('')
    );
  }
}
