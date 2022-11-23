import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { PlayersModule } from '../players/players.module';

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
  imports: [RouterModule.register(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
