import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPlayersQuery {
  @Transform((value) => Number(value))
  @IsOptional()
  limit?: number;

  @Transform((value) => Number(value))
  @IsOptional()
  offset?: number;
}
