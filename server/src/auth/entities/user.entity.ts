import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//Campos de la base de datos para la entidad del usuarioS
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100 }) 
  password: string;

  @Column({ default: 'user' })
  role: string;
}