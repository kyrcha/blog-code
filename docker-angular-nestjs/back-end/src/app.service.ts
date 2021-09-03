import { Injectable } from '@nestjs/common';
import { Message } from './app.dto';

@Injectable()
export class AppService {
  getHello(): Message {
    return new Message(process.env.APP_NAME);
  }
}
