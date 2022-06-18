import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { criminalModel, criminals } from 'src/cases/schema/criminals.model';
import { CriminalController } from './criminal.controller';
import { CriminalService } from './criminal.service';

@Module({
  imports: [MongooseModule.forFeature([{name: criminals.name, schema:criminalModel }])],
  controllers: [CriminalController],
  providers: [CriminalService]
})
export class CriminalModule {}
