import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './modules/players/players.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Player } from './models/player.model';
import { File } from './models/file.model';
import { AppRoutingModule } from './modules/routes/app-routing.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
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
