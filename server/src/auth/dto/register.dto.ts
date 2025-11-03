import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// estructura de datos para que se registre
export class RegisterDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida' })
  @IsNotEmpty({ message: 'El campo de email no puede estar vacío' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
