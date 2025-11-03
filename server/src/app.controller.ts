// maneja la ruta principal (/) de la aplicación

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // controlador base (sin ruta adicional)
export class AppController {
  // Se inyecta el servicio para poder usar sus métodos
  constructor(private readonly appService: AppService) {}

  @Get() 
  getHello(): string {
    return this.appService.getHello();
  }
}
