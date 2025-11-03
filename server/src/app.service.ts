// mensajito usado por el AppController

import { Injectable } from '@nestjs/common';

@Injectable() 
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
