import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';
import { RedirectFilter } from './common/filter/redirect.filter';
import { join } from 'path';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true})
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const environment = configService.get<string>('NODE_ENV');
  const IPFS_SERVICE_URL = "https://ipfs.catswords.com";
  
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

  // Proxy endpoints
  app.enableCors({
    origin: true,
    methods: 'POST',
    credentials: true,
  });
  app.use('/ipfs', createProxyMiddleware({
    target: IPFS_SERVICE_URL,
    changeOrigin: true,  // → Target URL을 변경하는 옵션
    pathRewrite: {
        [`^/ipfs`]: '/api/v0',
    }
  }));
  await app.listen(PORT);
  logger.log(
    `NODE_ENV: ${environment}\n Listening at localhost:${PORT}`,
  );
}
bootstrap();
