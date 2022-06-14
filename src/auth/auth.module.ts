import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { PStModel } from "./auth.model";

@Module({
  imports: [MongooseModule.forFeature([{name: 'pstation', schema: PStModel }])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}