import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateFileDto } from './dto/create-file.dto';

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
  })
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;

  @Column({ type: DataType.INTEGER })
  playerId: number;
}
