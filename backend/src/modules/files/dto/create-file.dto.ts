import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  data: Uint8Array;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  playerId?: number;
}
