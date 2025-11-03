// prueba para comprobar que el AuthController se crea correctamente

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  // antes de cada prueba se configura el módulo de prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // se agrega el controlador al módulo de prueba
    }).compile(); 

    // instancia del controlador
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); // espera que el controlador exista
  });
});
