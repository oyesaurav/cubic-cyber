import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { caseModel, cases } from './schema/cases.model';
import { criminalModel, criminals } from './schema/criminals.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: cases.name, schema: caseModel }, {name: criminals.name, schema:criminalModel }])],
  providers: [CasesService ],
  controllers: [CasesController]
})
export class CasesModule {}
