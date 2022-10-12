import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import {PlayersController} from "./players.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Player} from "./player.model";

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [
      SequelizeModule.forFeature([Player])
  ]
})
export class PlayersModule {}
