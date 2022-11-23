import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from '../../models/player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { File } from '../../models/file.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PlayersService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(Player) private readonly playerModel: typeof Player,
    @InjectModel(File) private readonly fileModel: typeof File,
  ) {}

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel.create(dto);
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.findAll();
  }

  async getPlayerById(id: number): Promise<Player> {
    return await this.playerModel.findOne({
      where: { id },
    });
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
}
