import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createPlayer(@Body() dto: CreatePlayerDto) {
    return await this.playersService.createPlayer(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePLayer(@Param('id') id: number, @Body() dto: UpdatePlayerDto) {
    return await this.playersService.updatePlayer(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePlayer(@Param('id') id: number) {
    return this.playersService.deletePLayer(id);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
}
