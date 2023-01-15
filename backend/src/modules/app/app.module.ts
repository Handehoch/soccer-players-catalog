import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from '../players/players.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Player } from '../../models/player.model';
import { File } from '../../models/file.model';
import { AppRoutingModule } from '../routes/app-routing.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: 'postgres://rfpxgnnv:eG_bKGvqDtGR0ap3Q2QtyFhsyebZwwHz@hattie.db.elephantsql.com/rfpxgnnv',
      models: [Player, File],
      autoLoadModels: true,
      synchronize: true,
    }),
    PlayersModule,
    AppRoutingModule,
    FilesModule,
  ],
})
export class AppModule {}
