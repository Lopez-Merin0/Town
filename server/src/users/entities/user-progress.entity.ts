import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('jsonb', { nullable: true, default: null })
  minigame1Progress: {
    completedQuestions: Array<{
      questionId: number;
      completed: boolean;
      attempts: number;
      timestamp: string;
    }>;
    currentQuestionIndex: number;
    totalCompleted: number;
  } | null;

  @Column('jsonb', { nullable: true, default: null })
  minigame2Progress: {
    completedQuestions: Array<{
      questionId: number;
      completed: boolean;
      attempts: number;
      timestamp: string;
    }>;
    currentQuestionIndex: number;
    totalCompleted: number;
  } | null;

  @Column('jsonb', { nullable: true, default: null })
  minigame3Progress: {
    completedQuestions: Array<{
      questionId: number;
      completed: boolean;
      attempts: number;
      timestamp: string;
    }>;
    currentQuestionIndex: number;
    totalCompleted: number;
  } | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
