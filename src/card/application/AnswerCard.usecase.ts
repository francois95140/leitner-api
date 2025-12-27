import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { CardRepository } from '../domain/CardRepository';

@Injectable()
export class AnswerCardUseCase {
    constructor(
        @Inject('CardRepository') private readonly cardRepository: CardRepository,
    ) { }

    async execute(cardId: string, isValid: boolean): Promise<void> {
        const card = await this.cardRepository.findById(cardId);
        if (!card) {
            throw new NotFoundException(`Card with ID ${cardId} not found`);
        }

        const updatedCard = card.answer(isValid);
        await this.cardRepository.save(updatedCard);
    }
}
