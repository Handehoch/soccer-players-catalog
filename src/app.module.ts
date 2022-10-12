import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './players/players.controller';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [AppController, PlayersController],
  providers: [AppService],
})
export class AppModule {}
