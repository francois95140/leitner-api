import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../domain/CardRepository';
import { CreateCardDto } from './dto/CreateCard.dto';
import { Card } from '../domain/Card';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateCardUseCase {
    constructor(
        @Inject('CardRepository') private readonly cardRepository: CardRepository,
    ) { }

    async execute(dto: CreateCardDto): Promise<Card> {
        const card = Card.create(uuidv4(), dto.question, dto.answer, dto.tag);
        await this.cardRepository.save(card);
        return card;
    }
}
