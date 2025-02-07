import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@infrastructure/api/app.module';
import { runSeeders } from '@infrastructure/api/seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.CLIENT_URL || 'http://localhost:4200',
      process.env.API_URL || 'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

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
