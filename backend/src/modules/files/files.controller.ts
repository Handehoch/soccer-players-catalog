import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  SerializeOptions,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '../../models/file.model';

@Controller()
@SerializeOptions({
  strategy: 'excludeAll',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  createFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .build(),
    )
    image: Express.Multer.File,
  ): Promise<File> {
    return this.filesService.createFile(image);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  getFileById(@Param('id', ParseIntPipe) id: number): Promise<File> {
    return this.filesService.getFileById(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/jpeg')
  getFileDataById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StreamableFile> {
    return this.filesService.getFileDataById(id);
  }
}
