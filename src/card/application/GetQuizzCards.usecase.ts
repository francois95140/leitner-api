import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';

@Injectable()
export class GetQuizzCardsUseCase {
    constructor(
        @Inject('CardRepository') private readonly cardRepository: CardRepository,
    ) { }

    async execute(dateString?: string): Promise<Card[]> {
        const date = dateString ? new Date(dateString) : new Date();

        if (dateString) {
            date.setHours(23, 59, 59, 999);
        }

        return this.cardRepository.findByDate(date);
    }
}

