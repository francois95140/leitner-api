import { Card } from './Card';
import { Category } from './Category';

describe('Card Domain Entity', () => {

    it('should create a card with Category FIRST and nextQuizzDate today (Immediate Retry)', () => {
        const card = Card.create('id-1', 'Question?', 'Answer', 'Tag');

        expect(card.category).toBe(Category.FIRST);

        const now = new Date();
        // Delay is 0, so should be approx now (or slightly in future depending on implementation details, but same day)
        // With current logic: now + 0 days = now.

        expect(card.nextQuizzDate).not.toBeNull();
        if (card.nextQuizzDate) {
            const diff = Math.abs(card.nextQuizzDate.getTime() - now.getTime());
            expect(diff).toBeLessThan(1000); // Less than 1 second diff
        }
    });

    it('should promote card when answer is valid (FIRST -> SECOND, Frequency 2 days)', () => {
        const card = Card.create('id-1', 'Q', 'A', 'T');
        // Initial state: FIRST

        const updatedCard = card.answer(true);

        expect(updatedCard.category).toBe(Category.SECOND);

        const now = new Date();
        const inTwoDays = new Date(now);
        inTwoDays.setDate(now.getDate() + 2);

        expect(updatedCard.nextQuizzDate).not.toBeNull();
        if (updatedCard.nextQuizzDate) {
            const diff = Math.abs(updatedCard.nextQuizzDate.getTime() - inTwoDays.getTime());
            expect(diff).toBeLessThan(1000);
        }
    });

    it('should promote card from SECOND to THIRD (Frequency 4 days)', () => {
        // Setup a card in SECOND category
        const initialCard = new Card('id', 'Q', 'A', 'T', Category.SECOND, new Date());

        const updatedCard = initialCard.answer(true);

        expect(updatedCard.category).toBe(Category.THIRD);

        const now = new Date();
        const inFourDays = new Date(now);
        inFourDays.setDate(now.getDate() + 4);

        expect(updatedCard.nextQuizzDate).not.toBeNull();
        if (updatedCard.nextQuizzDate) {
            const diff = Math.abs(updatedCard.nextQuizzDate.getTime() - inFourDays.getTime());
            expect(diff).toBeLessThan(1000);
        }
    });

    it('should reset card to FIRST when answer is invalid', () => {
        // Setup a card in advanced category
        const initialCard = new Card('id', 'Q', 'A', 'T', Category.FIFTH, new Date());

        const updatedCard = initialCard.answer(false);

        expect(updatedCard.category).toBe(Category.FIRST);

        const now = new Date();
        // Delay 0 => Immediate retry

        expect(updatedCard.nextQuizzDate).not.toBeNull();
        if (updatedCard.nextQuizzDate) {
            const diff = Math.abs(updatedCard.nextQuizzDate.getTime() - now.getTime());
            expect(diff).toBeLessThan(1000);
        }
    });

    it('should handle DONE category (set nextQuizzDate to null)', () => {
        // Dependent on current implementation choices for DONE
        const initialCard = new Card('id', 'Q', 'A', 'T', Category.SEVENTH, new Date());

        const updatedCard = initialCard.answer(true);
        expect(updatedCard.category).toBe(Category.DONE);
        expect(updatedCard.nextQuizzDate).toBeNull();
    });
});
