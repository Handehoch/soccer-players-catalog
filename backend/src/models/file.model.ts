import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateFileDto } from '../modules/files/dto/create-file.dto';

@Table({ tableName: 'files', createdAt: false, updatedAt: false })
export class File extends Model<File, CreateFileDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @Column({
    type: DataType.STRING,
  })
  path: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimetype: string;

  @Column({
    type: 'bytea',
    allowNull: false,
  })
  data: Uint8Array;

  @Column({
    type: DataType.INTEGER,
  })
  playerId: number;
}
