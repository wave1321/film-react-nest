import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/afisha.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<any[]> {
    return this.filmsRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    return this.filmsRepository.findById(id);
  }

  async findFilmSchedule(filmId: string) {
    return this.filmsRepository.findFilmSchedule(filmId);
  }
}
