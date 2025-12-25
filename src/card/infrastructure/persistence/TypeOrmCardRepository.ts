import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardRepository } from '../../domain/CardRepository';
import { Card } from '../../domain/Card';
import { CardEntity } from './entities/Card.entity';
import { Category } from '../../domain/Category';

@Injectable()
export class TypeOrmCardRepository implements CardRepository {
    constructor(
        @InjectRepository(CardEntity)
        private readonly repository: Repository<CardEntity>,
    ) { }

    async save(card: Card): Promise<void> {
        const entity = new CardEntity();
        entity.id = card.id;
        entity.question = card.question;
        entity.answer = card.answer;
        entity.tag = card.tag;
        entity.category = card.category;

        await this.repository.save(entity);
    }

    async findAll(): Promise<Card[]> {
        const entities = await this.repository.find();
        return entities.map(this.toDomain);
    }

    private toDomain(entity: CardEntity): Card {
        return new Card(
            entity.id,
            entity.question,
            entity.answer,
            entity.tag,
            entity.category as Category,
        );
    }
}
