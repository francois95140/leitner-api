import { Card } from './Card';
import { Category } from './Category';

describe('User Stories Domain Requirements', () => {

    it('Compare answers - Card entity should expose the original answer', () => {
        const originalAnswer = 'The Answer';
        const card = Card.create('id-1', 'Question', originalAnswer, 'Tag');

        expect(card.answerString).toBe(originalAnswer);
    });

    it('Force validation - answer(true) should promote card regardless of content match logic', () => {
        const card = Card.create('id-1', 'Question', 'Answer', 'Tag');

        expect(card.category).toBe(Category.FIRST);

        const updatedCard = card.answer(true);

        expect(updatedCard.category).toBe(Category.SECOND);
        const now = new Date();
        expect(updatedCard.nextQuizzDate!.getTime()).toBeGreaterThan(now.getTime());
    });

    it('Wrong answers - Should return to Category 1', () => {
        const card = new Card('id-1', 'Q', 'A', 'T', Category.FIFTH, new Date());

        const updatedCard = card.answer(false);

        expect(updatedCard.category).toBe(Category.FIRST);
        const now = new Date();
        const diff = Math.abs(updatedCard.nextQuizzDate!.getTime() - now.getTime());
        expect(diff).toBeLessThan(1000);
    });

    it('Correct answers - Should promote to next category', () => {
        const card = new Card('id-1', 'Q', 'A', 'T', Category.SECOND, new Date());

        const updatedCard = card.answer(true);

        expect(updatedCard.category).toBe(Category.THIRD);
    });

    it('Done Cards - Category 7 correct answer should archive the card (DONE)', () => {
        const card = new Card('id-1', 'Q', 'A', 'T', Category.SEVENTH, new Date());

        const updatedCard = card.answer(true);

        expect(updatedCard.category).toBe(Category.DONE);
        expect(updatedCard.nextQuizzDate).toBeNull();
    });

    it('One quiz per day - Correctly answered cards are rescheduled to the future', () => {
        const card = Card.create('id-1', 'Q', 'A', 'T');

        const updatedCard = card.answer(true);

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        expect(updatedCard.nextQuizzDate!.getTime()).toBeGreaterThanOrEqual(tomorrow.getTime());
    });
});
