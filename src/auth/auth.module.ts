import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { pstation, PStModel } from "./auth.model";
import { verifyToken } from "src/middleware/auth.middleware";

@Module({
  imports: [MongooseModule.forFeature([{name: pstation.name, schema: PStModel }])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(verifyToken)
    .forRoutes('auth/check')
  }
}