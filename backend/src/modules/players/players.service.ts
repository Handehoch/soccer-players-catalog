import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from '../../models/player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { File } from '../../models/file.model';
import { FilesService } from '../files/files.service';
import { ErrorMessage } from '../../utils/utils';
import { FindOptions } from 'sequelize';

@Injectable()
export class PlayersService {
  private readonly _playerOptions: FindOptions<Player>;

  constructor(
    private readonly filesService: FilesService,
    @InjectModel(Player) private readonly playerModel: typeof Player,
  ) {
    this._playerOptions = {
      include: [{ model: File, attributes: ['id', 'filename'] }],
    };
  }

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    const player = await this.playerModel.findOne({
      where: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        teamName: dto.teamName,
      },
    });

    if (player) {
      throw new BadRequestException(null, ErrorMessage.PLAYER_EXISTS);
    }

    return await this.playerModel.create(dto);
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.findAll({
      order: [['id', 'ASC']],
    });
  }

  async getPlayerById(id: number): Promise<Player> {
    const player = await this.playerModel.findOne({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(null, ErrorMessage.PLAYER_NOT_FOUND);
    }

    return player;
  }

  async updatePlayer(id: number, dto: UpdatePlayerDto): Promise<Player> {
    await this.playerModel.update(dto, {
      where: { id: id },
    });

    return this.playerModel.findOne({
      where: { id: id },
      ...this._playerOptions,
    });
  }

  async deletePLayer(id: number): Promise<Player> {
    const player = await this.playerModel.findOne({
      where: { id: id },
      ...this._playerOptions,
    });

    await this.playerModel.destroy({
      where: { id: id },
    });

    return player;
  }

  async setAvatarById(id: number, image: Express.Multer.File): Promise<Player> {
    const player = await this.getPlayerById(id);
    const file = await this.filesService.createFile(image);

    await this.filesService.deleteImagesByPlayerId(player.id);

    await player.update({
      avatar: file,
      avatarId: file.id,
    });

    await file.update({ playerId: player.id });

    return player;
  }

  async getAvatarById(id: number): Promise<StreamableFile> {
    return this.filesService.getFileDataByPlayerId(id);
  }
}
