import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from '../../models/player.model';
import { File } from '../../models/file.model';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [SequelizeModule.forFeature([Player, File])],
})
export class PlayersModule {}
