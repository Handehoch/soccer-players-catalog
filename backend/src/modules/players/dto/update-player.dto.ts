import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePlayerDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstname?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(['мужской', 'женский', 'male', 'female'])
  sex?: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform((date) => new Date(date.value))
  @IsDate()
  birthday?: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  teamName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  country?: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform((r) => parseInt(r.value))
  avatarId?: number;
}
