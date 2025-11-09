import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column('int')
  hall: number;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('double precision')
  price: number;

  @Column('text', {
    transformer: {
      to: (value: string[]) => (value ? value.join(',') : ''),
      from: (value: string) => (value ? value.split(',') : []),
    },
  })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column({ name: 'filmId' })
  filmId: string;
}
