import {Model, Table} from "sequelize-typescript";
import {CreatePlayerDto} from "./dto/create-player.dto";

@Table({tableName: 'players'})
export class PlayerModel extends Model<PlayerModel, CreatePlayerDto> {

}