import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './presentation/Card.controller';
import { CreateCardUseCase } from '../application/CreateCard.usecase';
import { GetCardsUseCase } from '../application/GetCards.usecase';
import { TypeOrmCardRepository } from './persistence/TypeOrmCardRepository';
import { CardEntity } from './persistence/entities/Card.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CardEntity])],
    controllers: [CardController],
    providers: [
        CreateCardUseCase,
        GetCardsUseCase,
        {
            provide: 'CardRepository',
            useClass: TypeOrmCardRepository,
        },
    ],
})
export class CardModule { }
