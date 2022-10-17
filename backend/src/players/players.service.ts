import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from './player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player) private readonly playerModel: typeof Player,
  ) {}

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel.create(dto);
  }

  async updatePlayer(id: number, dto: UpdatePlayerDto): Promise<Player> {
    await this.playerModel.update(dto, {
      where: { id: id },
    });

    return this.playerModel.findOne({
      where: { id: id },
    });
  }

  async deletePLayer(id: number) {
    const player = await this.playerModel.findOne({
      where: { id: id },
    });

    await this.playerModel.destroy({
      where: { id: id },
    });

    return player;
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.findAll();
  }
}
