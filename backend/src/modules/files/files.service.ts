import {
  HttpStatus,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from '../../models/file.model';
import { ErrorMessage } from '../../utils/utils';
import { CreateFileDto } from './dto/create-file.dto';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileModel: typeof File) {}

  async createFile(image: Express.Multer.File): Promise<File> {
    const dto: CreateFileDto = {
      filename: image.originalname,
      data: image.buffer,
    };

    return await this.fileModel.create(dto);
  }

  async getFileById(id: number): Promise<File> {
    const file = await this.fileModel.findOne({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(null, ErrorMessage.FILE_NOT_FOUND);
    }

    return file;
  }

  async getFileDataById(id: number): Promise<StreamableFile> {
    const file = await this.fileModel.findOne({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: ErrorMessage.AVATAR_NOT_FOUND,
      });
    }

    return new StreamableFile(Readable.from(file.data));
  }
}
