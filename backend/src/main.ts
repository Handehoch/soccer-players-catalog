import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3030;

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
  });
}

bootstrap();
