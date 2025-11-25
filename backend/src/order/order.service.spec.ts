import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/afisha.repository';

describe('OrderService', () => {
  let service: OrderService;

  // Создаем мок репозитория
  const mockFilmsRepository = {
    findById: jest.fn(),
    reserveSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsRepository, // Указываем dependency
          useValue: mockFilmsRepository, // Используем мок
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
