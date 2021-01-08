import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('my-first-topic') // Our topic name
  getHello(
    @Payload() message: Record<string, unknown>,
  ): Record<string, unknown> {
    const producerMessage = message.value;

    return {
      producerMessage,
    };
  }
}
