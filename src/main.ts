import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import path from 'path';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './http-exception.filter';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
   }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'uploads')
      : path.join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads',
    },
  );
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '..', '..', 'public')
      : path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist',
    },
  );
  app.useGlobalFilters(new HttpExceptionFilter);
  const config = new DocumentBuilder()
    .setTitle('isntkyu nest API')
    .setDescription('Nest로 스웨거 만들기 공부')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cokkie: {
        httpOnly: true,
      }
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
