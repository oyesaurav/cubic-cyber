import { Module } from '@nestjs/common';
import { CriminalController } from './criminal.controller';
import { CriminalService } from './criminal.service';

@Module({
  controllers: [CriminalController],
  providers: [CriminalService]
})
export class CriminalModule {}
