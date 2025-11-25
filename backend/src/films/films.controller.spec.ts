import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let filmsService: FilmsService;

  const mockFilm = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 8.5,
    director: 'Test Director',
    tags: ['action', 'adventure'],
    title: 'Test Film',
    about: 'Test about',
    description: 'Test description',
    image: 'test.jpg',
    cover: 'cover.jpg',
    schedule: [],
  };

  const mockSchedule = [
    {
      id: '223e4567-e89b-12d3-a456-426614174000',
      daytime: '2023-12-01T18:00:00Z',
      hall: 1,
      rows: 10,
      seats: 20,
      price: 350,
      taken: ['1:1', '1:2'],
    },
  ];

  const mockFilmsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should return films response with correct structure', async () => {
      mockFilmsService.findAll.mockResolvedValue([mockFilm]);

      const result = await controller.getFilms();

      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('items');
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        id: mockFilm.id,
        rating: mockFilm.rating,
        director: mockFilm.director,
        tags: mockFilm.tags,
        title: mockFilm.title,
        about: mockFilm.about,
        description: mockFilm.description,
        image: mockFilm.image,
        cover: mockFilm.cover,
      });
    });

    it('should calculate total as sum of ratings', async () => {
      const films = [
        { ...mockFilm, rating: 5 },
        { ...mockFilm, id: '2', rating: 7.5 },
      ];
      mockFilmsService.findAll.mockResolvedValue(films);

      const result = await controller.getFilms();

      expect(result.total).toBe(12.5);
    });
  });

  describe('getFilmSchedule', () => {
    it('should return schedule for specific film', async () => {
      const filmId = '123e4567-e89b-12d3-a456-426614174000';
      mockFilmsService.findFilmSchedule.mockResolvedValue(mockSchedule);

      const result = await controller.getFilmSchedule(filmId);

      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('items');
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        id: mockSchedule[0].id,
        daytime: mockSchedule[0].daytime,
        hall: mockSchedule[0].hall.toString(),
        rows: mockSchedule[0].rows,
        seats: mockSchedule[0].seats,
        price: mockSchedule[0].price,
        taken: mockSchedule[0].taken,
      });
    });

    it('should calculate total as sum of prices', async () => {
      const filmId = '123e4567-e89b-12d3-a456-426614174000';
      const schedules = [
        { ...mockSchedule[0], price: 300 },
        { ...mockSchedule[0], id: '2', price: 450 },
      ];
      mockFilmsService.findFilmSchedule.mockResolvedValue(schedules);

      const result = await controller.getFilmSchedule(filmId);

      expect(result.total).toBe(750);
    });
  });
});
