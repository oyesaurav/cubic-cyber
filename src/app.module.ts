import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { CriminalModule } from './criminal/criminal.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), CasesModule, CriminalModule,
      MongooseModule.forRoot(process.env.MONGO_URL)],
  
})
export class AppModule {}
