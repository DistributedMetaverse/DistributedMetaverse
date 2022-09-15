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
// import { urlencoded, json } from 'body-parser';
// import * as express from 'express';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true})
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const environment = configService.get<string>('NODE_ENV');
  const IPFS_SERVICE_URL = "https://ipfs.catswords.com";
  const OFFCHAIN_SERVICE_URL = "http://154.12.242.48:1323"
  
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
  //app.use(express.json({ limit: '500mb' }));
  //app.use(express.urlencoded({ limit: '500mb', extended: true }));

  // Proxy endpoints
  app.enableCors({
    allowedHeaders: ['Accept', 'Content-Type', 'Origin', 'Authorization'],
    origin: ['https://ipfs.catswords.com', 'http://localhost:4000'],
    methods: 'POST',
    credentials: true,
  });
  app.use('/ipfs', createProxyMiddleware({
    target: IPFS_SERVICE_URL,
    changeOrigin: true,  // → IPFS Target URL을 변경하는 옵션
    pathRewrite: {
        [`^/ipfs`]: '/api/v0',
    }
  }));
  app.use('/offchain', createProxyMiddleware({
    target: OFFCHAIN_SERVICE_URL,
    changeOrigin: true,  // → OffChain Target URL을 변경하는 옵션
    pathRewrite: {
        [`^/offchain`]: '',
    }
  }));
  await app.listen(PORT);
  logger.log(
    `NODE_ENV: ${environment}\n Listening at localhost:${PORT}`,
  );
}
bootstrap();
