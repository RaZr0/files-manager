import { Module } from '@nestjs/common';
import { FilesModule } from './modules/products/files.module';

@Module({
  imports: [
    FilesModule
  ],
})
export class AppModule {}
