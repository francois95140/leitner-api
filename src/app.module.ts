import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/infrastructure/Card.module';
import { CardEntity } from './card/infrastructure/persistence/entities/Card.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT as string) || 5432,
      username: process.env.DATABASE_USERNAME || 'leitner',
      password: process.env.DATABASE_PASSWORD || 'leitner',
      database: process.env.DATABASE_NAME || 'leitner',
      entities: [CardEntity],
      synchronize: true, // Auto-create tables (dev only)
    }),
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
