import { Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

  constructor(private filesService: FilesService) {
  }


  @Post('upload/:projectName')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('projectName') projectName, @UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException('File not uploaded', HttpStatus.BAD_REQUEST);
      }

      const fileMetadata = await this.filesService.upload(projectName, file.buffer, file.filename,file.mimetype);
      return fileMetadata;

    } catch (error) {
    }
  }


  @Get(':/projectName')
  getFilesMetadata(@Param('projectName') projectName) {
    return this.filesService.getFilesMetadata(projectName);
  }

}
