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
  ValidationPipe,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
  StreamableFile,
  Header,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../../models/player.model';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetPlayersQuery } from './query/get-players.query';

@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createPlayer(@Body(ValidationPipe) dto: CreatePlayerDto): Promise<Player> {
    return this.playersService.createPlayer(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getPlayers(@Query(ValidationPipe) query: GetPlayersQuery): Promise<Player[]> {
    return this.playersService.getPlayers(query);
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

  @Post(':id/avatar')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  setAvatarById(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .build(),
    )
    image: Express.Multer.File,
  ): Promise<Player> {
    return this.playersService.setAvatarById(id, image);
  }

  @Get(':id/avatar')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/jpeg')
  getAvatarById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StreamableFile> {
    return this.playersService.getAvatarById(id);
  }
}
