import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Player} from "./player.model";

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player) private readonly playerModel: typeof Player) {
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.findAll();
  }
}
