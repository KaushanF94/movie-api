import { IsString, IsDate, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly releaseDate: Date;

  @IsArray()
  readonly genres: string[]; // An array of genre names
}

export class UpdateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly releaseDate: Date;

  @IsArray()
  readonly genres: string[]; // An array of genre names
}
