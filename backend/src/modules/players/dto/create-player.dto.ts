import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['мужской', 'женский', 'male', 'female'])
  sex: string;

  @IsNotEmpty()
  @Transform((date) => new Date(date.value))
  @IsDate()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
