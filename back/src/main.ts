import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { RedirectFilter } from './common/filter/redirect.filter';
import { join } from 'path';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const environment = configService.get<string>('NODE_ENV');
  app.useStaticAssets(join(__dirname, '..', '..', 'front/build'));
  app.setViewEngine('html');
  app.setGlobalPrefix("api", {
    exclude: [{ path: '/', method: RequestMethod.ALL }],
  });
  app.useGlobalFilters(new RedirectFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.use(cookieParser());
  app.use('/', csrf({cookie: true}));
  await app.listen(PORT);
  logger.log(
    `NODE_ENV: ${environment}\n Listening at localhost:${PORT}`,
  );
}
bootstrap();
