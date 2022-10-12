import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {RouterModule, Routes} from "@nestjs/core";

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/players',
        module: PlayersModule
      },
    ],
  },
];

@Module({
  imports: [
      ConfigModule.forRoot({ envFilePath: '.env' }),
      RouterModule.register(routes),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD as string,
        database: 'postgres',
        models: [],
        autoLoadModels: true
      }),
    PlayersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
