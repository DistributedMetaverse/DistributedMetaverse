import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { StatusController } from './status/status.controller';
import { StatusModule } from './status/status.module';
import { SettingController } from './setting/setting.controller';
import { SettingModule } from './setting/setting.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { isAuthenticated } from './common/middleware/auth.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'front/build'),
      exclude: ['/api/(.*)', '/ipfs/(.*)'],
    }),
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
      namingStrategy: new SnakeNamingStrategy(),
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
      .forRoutes(FileController, StatusController, SettingController, UserController);
  }
}

