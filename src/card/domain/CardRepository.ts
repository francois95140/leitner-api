import { Card } from './Card';

export interface CardRepository {
    save(card: Card): Promise<void> | void;
    findAll(tags?: string[]): Promise<Card[]> | Card[];
    findByDate(date: Date): Promise<Card[]> | Card[];
    findById(cardId: string): Promise<Card | undefined> | Card | undefined;
}
