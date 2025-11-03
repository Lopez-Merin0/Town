import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// estructura de datos para el login
export class LoginDto {
  @IsEmail({}, { message: 'El campo de email debe ser una dirección de correo válida' })
  @IsNotEmpty({ message: 'El campo de email no puede estar vacío' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}