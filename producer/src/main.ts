import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 80;

  await app.listen(port, () =>
    console.log('Kafka producer service is listening!'),
  );
}
bootstrap();
