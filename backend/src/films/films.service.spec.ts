import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/afisha.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  // Создаем мок репозитория
  const mockFilmsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository, // Указываем dependency
          useValue: mockFilmsRepository, // Используем мок
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
