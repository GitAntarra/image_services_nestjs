import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigEnvironment } from './config/environment.config';
import { ConfigDatabase } from './config/database.config';
import { UserModule } from './app/users/user.module';
import { AuthModule } from './app/auth/auth.module';
import { GaleryModule } from './app/galeries/galery.module';
import LogsMiddleware from './log.midleware';

@Module({
  imports: [
    ConfigEnvironment,
    ConfigDatabase,
    UserModule,
    AuthModule,
    GaleryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
