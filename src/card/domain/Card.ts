import { Category } from './Category';

export class Card {
    constructor(
        public readonly id: string,
        public readonly question: string,
        public readonly answer: string,
        public readonly tag: string,
        public readonly category: Category = Category.FIRST,
        public readonly nextQuizzDate: Date,
    ) { }

    static create(id: string, question: string, answer: string, tag: string): Card {
        const nextQuizzDate = new Date();
        nextQuizzDate.setDate(nextQuizzDate.getDate() + 1);
        return new Card(id, question, answer, tag, Category.FIRST, nextQuizzDate);
    }
}
