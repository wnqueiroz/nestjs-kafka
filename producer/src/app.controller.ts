import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

import { AppService } from './app.service';

const kafkaHost = process.env.KAFKA_HOST || 'localhost';
const kafkaPort = process.env.KAFKA_PORT || '9093';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: [`${kafkaHost}:${kafkaPort}`],
      },
      consumer: {
        groupId: 'my-kafka-consumer', // Should be the same thing we give in consumer
      },
    },
  })
  client: ClientKafka;

  async onModuleInit(): Promise<void> {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('my-first-topic');

    await this.client.connect();
  }

  @Get()
  async getHello(): Promise<any> {
    const consumerResponse = await this.client
      .send('my-first-topic', 'Hello Kafka')
      .toPromise(); // args - topic, message

    return {
      consumerResponse,
    };
  }
}
