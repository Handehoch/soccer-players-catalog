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
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  Res,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../../models/players/player.model';
import { CreatePlayerDto } from '../../models/players/dto/create-player.dto';
import { UpdatePlayerDto } from '../../models/players/dto/update-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('image'))
  async setAvatar(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
  ): Promise<Player> {
    return this.playersService.setAvatar(id, {
      filename: image.originalname,
      data: image.buffer,
      playerId: id,
    });
  }

  @Get(':id/avatar')
  async getAvatarById(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ): Promise<Uint8Array> {
    const image = await this.playersService.getAvatarById(id);
    // const stream = Readable.from(image.data);

    return image.data;
  }
}
