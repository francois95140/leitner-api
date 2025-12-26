import { Card } from './Card';

export interface CardRepository {
    save(card: Card): Promise<void> | void;
    findAll(tags?: string[]): Promise<Card[]> | Card[];
}
