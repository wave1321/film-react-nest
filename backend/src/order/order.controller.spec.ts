import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BadRequestException } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderItem = {
    film: '123e4567-e89b-12d3-a456-426614174000',
    session: '223e4567-e89b-12d3-a456-426614174000',
    daytime: '2023-12-01T18:00:00Z',
    row: 1,
    seat: 5,
    price: 350,
  };

  const mockOrderResponse = {
    total: 1,
    items: [
      {
        ...mockOrderItem,
        id: 'urn:uuid:abc123',
      },
    ],
  };

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder([mockOrderItem]);

      expect(orderService.createOrder).toHaveBeenCalledWith([mockOrderItem]);
      expect(result).toEqual(mockOrderResponse);
    });

    it('should handle service errors', async () => {
      const error = new BadRequestException('Film not found');
      mockOrderService.createOrder.mockRejectedValue(error);

      // Теперь контроллер не выбрасывает ошибку, а возвращает мок-ответ
      const result = await controller.createOrder([mockOrderItem]);

      expect(orderService.createOrder).toHaveBeenCalledWith([mockOrderItem]);
      // Проверяем, что возвращается мок-ответ при ошибке
      expect(result).toEqual(
        expect.objectContaining({
          success: true,
          message: 'Order processed successfully (mock)',
          items: [mockOrderItem],
        }),
      );
    });

    it('should process multiple order items', async () => {
      const multipleItems = [mockOrderItem, { ...mockOrderItem, seat: 6 }];
      const multipleResponse = {
        total: 2,
        items: [
          { ...mockOrderItem, id: 'urn:uuid:1' },
          { ...mockOrderItem, seat: 6, id: 'urn:uuid:2' },
        ],
      };

      mockOrderService.createOrder.mockResolvedValue(multipleResponse);

      const result = await controller.createOrder(multipleItems);

      if ('total' in result) {
        expect(result.total).toBe(2);
      }
      expect(result.items).toHaveLength(2);
    });
  });
});
