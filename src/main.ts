import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { runSeeders } from '@infrastructure/seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Thiumph-motocycle')
    .setDescription('Thiumph clean archi api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);

  await runSeeders();

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
