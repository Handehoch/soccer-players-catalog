import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { Player } from './players/player.model';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/players',
        module: PlayersModule,
      },
    ],
  },
];

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Player],
      autoLoadModels: true,
      synchronize: true,
    }),
    PlayersModule,
  ],
})
export class AppModule {}
