import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { CriminalModule } from './criminal/criminal.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.MONGO_URL),
      CasesModule,
      CriminalModule],
  
})
export class AppModule {}
