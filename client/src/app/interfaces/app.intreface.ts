import { SafeUrl } from '@angular/platform-browser';

export interface IPlayer {
  id: number;
  firstname: string;
  lastname: string;
  sex: 'мужской' | 'женский' | 'male' | 'female';
  birthday: Date;
  teamName: string;
  country: string;
  avatarId: number;
  avatar: SafeUrl;
}

export interface INotification {
  message: string;
  colorScheme: string;
}
