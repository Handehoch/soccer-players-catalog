import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateFileDto } from '../modules/files/dto/create-file.dto';
import { Expose } from 'class-transformer';

@Table({ tableName: 'files', createdAt: false, updatedAt: false })
export class File extends Model<File, CreateFileDto> {
  @Expose()
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @Column({
    type: 'bytea',
    allowNull: false,
  })
  data: Uint8Array;

  @Expose()
  @Column({
    type: DataType.INTEGER,
  })
  playerId: number;
}
