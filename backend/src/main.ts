import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsConfig, SwaggerConfig } from './common/configs/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Database

  const configService = app.get(ConfigService);
  const port = configService.get<EnvironmentVariables>('PORT', { infer: true });
  const corsConfig = configService.get<CorsConfig>('cors', { infer: true });
  const frontendOrigin = configService.get<EnvironmentVariables>(
    'FRONTEND_ORIGIN',
    { infer: true },
  );

  // Documentation
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const swaggerBasePath = configService.get<EnvironmentVariables>(
    'SWAGGER_BASE_PATH',
    {
      infer: true,
    },
  );
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version || '1.0')
      .addServer(swaggerBasePath || '')
      .addBasicAuth()
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('', app, document);
  }

  // Cors
  if (corsConfig?.enabled) {
    app.enableCors({
      origin: ['http://localhost:3000', frontendOrigin],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
      maxAge: 600,
    });
  }
  console.log(`Is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
