import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleSessionDto {
  @IsUUID()
  id: string;

  @IsString()
  daytime: string;

  @IsNumber()
  hall: number;

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

export class CreateFilmDto {
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
  image: string;

  @IsString()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSessionDto)
  schedule: CreateScheduleSessionDto[];
}
