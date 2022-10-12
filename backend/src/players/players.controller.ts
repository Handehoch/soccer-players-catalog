import {Body, Controller, Get, Post} from '@nestjs/common';
import {PlayersService} from "./players.service";
import {Player} from "./player.model";
import {CreatePlayerDto} from "./dto/create-player.dto";

@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {
  }

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {

  }

  @Get('')
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
}
