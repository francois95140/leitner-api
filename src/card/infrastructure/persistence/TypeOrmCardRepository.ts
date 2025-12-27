import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThanOrEqual } from 'typeorm';
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
        entity.answer = card.answerString;
        entity.tag = card.tag;
        entity.category = card.category;
        entity.nextQuizzDate = card.nextQuizzDate;

        await this.repository.save(entity);
    }

    async findAll(tags?: string[]): Promise<Card[]> {
        let where = {};
        if (tags && tags.length > 0) {
            where = { tag: In(tags) };
        }
        const entities = await this.repository.find({ where });
        return entities.map(this.toDomain);
    }

    async findByDate(date: Date): Promise<Card[]> {
        const entities = await this.repository.find({
            where: {
                nextQuizzDate: LessThanOrEqual(date),
            },
        });
        return entities.map(this.toDomain);
    }

    async findById(cardId: string): Promise<Card | undefined> {
        const entity = await this.repository.findOne({ where: { id: cardId } });
        if (!entity) {
            return undefined;
        }
        return this.toDomain(entity);
    }

    private toDomain(entity: CardEntity): Card {
        return new Card(
            entity.id,
            entity.question,
            entity.answer,
            entity.tag,
            entity.category as Category,
            entity.nextQuizzDate,
        );
    }
}
