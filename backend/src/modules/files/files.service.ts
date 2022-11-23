import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from '../../models/file.model';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileModel: typeof File) {}

  async createFile(dto: CreateFileDto, file: Express.Multer.File) {}

  async getFileById(id: number) {}

  async findOrCreate(id: number, dto: CreateFileDto) {
    const [file, created] = await this.fileModel.findOrCreate({
      where: { playerId: id },
    });
  }
}
