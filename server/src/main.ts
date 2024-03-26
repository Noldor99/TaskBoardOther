import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { useContainer } from 'class-validator';

async function start() {

  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use((req, res, next) => {
    const allowedOrigins = [`https://task-board-other-hp9yijlly-noldor99s-projects.vercel.app, http://localhost:${PORT}`];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
  });


  const config = new DocumentBuilder()
    .setTitle('Cloud storage')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  try {
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`),
    )
  } catch (error) {
    console.log('Error starting the server:', error)
  }
}
start();
