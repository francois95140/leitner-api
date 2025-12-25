import { Card } from '../../domain/Card';
import { CardRepository } from '../../domain/CardRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryCardRepository implements CardRepository {
    private readonly cards: Map<string, Card> = new Map();

    save(card: Card): void {
        this.cards.set(card.id, card);
    }

    findAll(): Card[] {
        return Array.from(this.cards.values());
    }
}
