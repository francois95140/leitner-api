import { Category } from './Category';

export class Card {
    constructor(
        public readonly id: string,
        public readonly question: string,
        public readonly answer: string,
        public readonly tag: string,
        public readonly category: Category = Category.FIRST,
    ) { }

    static create(id: string, question: string, answer: string, tag: string): Card {
        return new Card(id, question, answer, tag, Category.FIRST);
    }
}
