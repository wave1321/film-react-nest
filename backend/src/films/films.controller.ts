import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('films')
  async getFilms(): Promise<FilmsResponseDto> {
    const films = await this.filmsService.findAll();

    return {
      total: films.reduce((sum, film) => sum + film.rating, 0),
      items: films.map((film) => ({
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        title: film.title,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
      })),
    };
  }

  @Get('films/:id/schedule')
  async getFilmSchedule(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.filmsService.findFilmSchedule(id);

    return {
      total: schedule.reduce((sum, session) => sum + session.price, 0),
      items: schedule.map((session) => ({
        id: session.id,
        daytime: session.daytime,
        hall: session.hall.toString(),
        rows: session.rows,
        seats: session.seats,
        price: session.price,
        taken: session.taken,
      })),
    };
  }
}
