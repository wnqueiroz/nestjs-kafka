import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const kafkaHost = process.env.KAFKA_HOST || 'localhost';
  const kafkaPort = process.env.KAFKA_PORT || '9093';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${kafkaHost}:${kafkaPort}`],
        },
        consumer: {
          groupId: 'my-kafka-consumer',
        },
      },
    },
  );

  app.listen(() => console.log('Kafka consumer service is listening!'));
}
bootstrap();
