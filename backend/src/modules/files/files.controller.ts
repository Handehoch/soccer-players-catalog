import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createFile() {}
}
