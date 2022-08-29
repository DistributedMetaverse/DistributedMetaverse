import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { StatusModule } from './status/status.module';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';
import { isAuthenticated } from './common/middleware/auth.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { isAdmin } from './common/middleware/registry.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test', 
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [__dirname + "/**/*.entity.{ts,js}"],
    }),
    AuthModule,
    FileModule,
    StatusModule,
    SettingModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated, LoggerMiddleware)
      .forRoutes(FileModule, StatusModule, SettingModule, UserModule);
    consumer
      .apply(isAdmin)
      .forRoutes(AuthModule);
  }
}

