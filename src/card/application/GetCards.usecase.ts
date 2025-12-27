import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';

@Injectable()
export class GetCardsUseCase {
    constructor(
        @Inject('CardRepository') private readonly cardRepository: CardRepository,
    ) { }

    async execute(tags?: string[]): Promise<Card[]> {
        return this.cardRepository.findAll(tags);
    }
}
