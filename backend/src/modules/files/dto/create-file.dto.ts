import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StreamableFile } from '@nestjs/common';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @IsNotEmpty()
  data: Uint8Array | StreamableFile;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  playerId?: number;
}
