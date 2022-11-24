import {
  Column,
  DataType,
  HasOne,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreatePlayerDto } from '../modules/players/dto/create-player.dto';
import { File } from './file.model';

@Table({ tableName: 'players' })
export class Player extends Model<Player, CreatePlayerDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Index({
    name: 'fullName',
    unique: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Index({
    name: 'fullName',
    unique: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sex: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  teamName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @HasOne(() => File, 'playerId')
  avatar: File;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  avatarId: number;
}
