//TODO описать DTO для запросов к /films
import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class FilmDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

export class FilmsResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: FilmDto[];
}

export class ScheduleSessionDto {
  @IsUUID()
  id: string;

  @IsDateString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  @Min(1)
  rows: number;

  @IsNumber()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class ScheduleResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  items: ScheduleSessionDto[];
}
