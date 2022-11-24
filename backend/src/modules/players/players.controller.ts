import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../../models/player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createPlayer(@Body() dto: CreatePlayerDto): Promise<Player> {
    return this.playersService.createPlayer(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getPlayerById(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playersService.getPlayerById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePLayer(
    @Param('id') id: number,
    @Body() dto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playersService.updatePlayer(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePlayer(@Param('id') id: number): Promise<Player> {
    return this.playersService.deletePLayer(id);
  }
}
