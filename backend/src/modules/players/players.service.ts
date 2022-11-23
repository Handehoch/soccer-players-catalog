import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from '../../models/players/player.model';
import { CreatePlayerDto } from '../../models/players/dto/create-player.dto';
import { UpdatePlayerDto } from '../../models/players/dto/update-player.dto';
import { CreateFileDto } from '../../models/file/dto/create-file.dto';
import { File } from '../../models/file/file.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player) private readonly playerModel: typeof Player,
    @InjectModel(File) private readonly fileModel: typeof File,
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

  async deletePLayer(id: number): Promise<Player> {
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

  async setAvatar(id: number, dto: CreateFileDto): Promise<Player> {
    let file = await this.fileModel.findOne({
      where: { playerId: id },
    });

    if (!file) {
      file = await this.fileModel.create(dto);
    } else {
      await this.fileModel.update(dto, {
        where: { playerId: id },
      });
    }

    const update: UpdatePlayerDto = {
      avatarId: file.id,
    };

    return await this.updatePlayer(id, update);
  }

  async getAvatarById(id: number) {
    const player = await this.playerModel.findOne({
      where: { id: id },
    });

    return await this.fileModel.findOne({
      where: { id: player.avatarId },
    });
  }
}
