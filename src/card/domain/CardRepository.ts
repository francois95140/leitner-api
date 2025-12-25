import { Card } from './Card';

export interface CardRepository {
    save(card: Card): Promise<void> | void;
    findAll(): Promise<Card[]> | Card[];
}
