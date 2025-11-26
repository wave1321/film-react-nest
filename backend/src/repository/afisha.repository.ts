import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({
      relations: ['schedule'],
    });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findFilmSchedule(filmId: string): Promise<Schedule[]> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
    return film ? film.schedule : [];
  }

  async reserveSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });

    if (schedule) {
      if (!schedule.taken.includes(seatKey)) {
        schedule.taken.push(seatKey);
        await this.scheduleRepository.save(schedule);
      }
    }
  }
}
