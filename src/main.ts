import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './dotenv';
import { apiConstants } from './api.constats';

console.log(env.dbEnvironment);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(
      `${apiConstants.name} ${apiConstants.version} ${env.dbEnvironment}`,
    )
    .setDescription(
      `Documentacion de ${apiConstants.name} ${env.dbEnvironment}`,
    )
    .setVersion(apiConstants.version)
    .addTag('RoomBeast')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Documentacion', app, document);
  await app.listen(apiConstants.port);
}
bootstrap();
