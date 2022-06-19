import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { caseModel, cases } from 'src/cases/schema/cases.model';
import { criminalModel, criminals } from 'src/cases/schema/criminals.model';
import { CriminalController } from './criminal.controller';
import { CriminalService } from './criminal.service';
import * as multer from 'multer'
import { storage } from 'src/middleware/upload.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: criminals.name, schema: criminalModel },
    { name: cases.name, schema: caseModel }
  ])],
  controllers: [CriminalController],
  providers: [CriminalService]
})
export class CriminalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(multer({storage}).single("file"))
    .forRoutes('/criminal/photo')
  }
}
