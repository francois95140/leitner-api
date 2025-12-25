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
      host: 'localhost',
      port: 5432,
      username: 'leitner',
      password: 'leitner',
      database: 'leitner',
      entities: [CardEntity],
      synchronize: true, // Auto-create tables (dev only)
    }),
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
