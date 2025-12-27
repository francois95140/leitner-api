import { Category } from './Category';

export class Card {
    constructor(
        public readonly id: string,
        public readonly question: string,
        public readonly answerString: string,
        public readonly tag: string,
        public readonly category: Category = Category.FIRST,
        public readonly nextQuizzDate: Date | null,
    ) { }

    static create(id: string, question: string, answerString: string, tag: string): Card {
        const nextQuizzDate = new Date();
        nextQuizzDate.setDate(nextQuizzDate.getDate());
        return new Card(id, question, answerString, tag, Category.FIRST, nextQuizzDate);
    }

    answer(isValid: boolean): Card {
        const frequencyMap: Record<Category, number> = {
            [Category.FIRST]: 0,
            [Category.SECOND]: 2,
            [Category.THIRD]: 4,
            [Category.FOURTH]: 8,
            [Category.FIFTH]: 16,
            [Category.SIXTH]: 32,
            [Category.SEVENTH]: 64,
            [Category.DONE]: 0,
        };

        const categories = Object.values(Category);
        let newCategory = this.category;
        let delayInDays = 1;

        if (isValid) {
            const currentIndex = categories.indexOf(this.category);
            if (currentIndex < categories.length - 1) {
                newCategory = categories[currentIndex + 1];
            }
            delayInDays = frequencyMap[newCategory] || 0;
        } else {
            newCategory = Category.FIRST;
            delayInDays = frequencyMap[Category.FIRST];
        }

        let nextQuizzDate: Date | null = new Date();

        if (newCategory === Category.DONE) {
            nextQuizzDate = null;
        } else {
            nextQuizzDate.setDate(nextQuizzDate.getDate() + delayInDays);
        }

        return new Card(
            this.id,
            this.question,
            this.answerString,
            this.tag,
            newCategory,
            nextQuizzDate,
        );
    }
}
