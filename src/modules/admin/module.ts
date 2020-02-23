import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RequestController } from './controllers/request';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/user';
import { RequestRepository } from './repositories/request';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { RequestService } from './services/request';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController, RequestController],
  providers: [AuthService, UserRepository, UserService, RequestRepository, RequestService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
