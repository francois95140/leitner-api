import { Test, TestingModule } from '@nestjs/testing';
import { GetQuizzCardsUseCase } from './GetQuizzCards.usecase';
import { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';
import { Category } from '../domain/Category';

describe('GetQuizzCardsUseCase', () => {
    let useCase: GetQuizzCardsUseCase;
    let cardRepository: Partial<CardRepository>;

    beforeEach(async () => {
        cardRepository = {
            findByDate: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetQuizzCardsUseCase,
                {
                    provide: 'CardRepository',
                    useValue: cardRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetQuizzCardsUseCase>(GetQuizzCardsUseCase);
    });

    it('should get cards due for a date', async () => {
        const today = new Date();
        const cards = [Card.create('id-1', 'Q', 'A', 'T')];
        (cardRepository.findByDate as jest.Mock).mockResolvedValue(cards);

        const result = await useCase.execute(today.toISOString());

        expect(result).toEqual(cards);
        expect(cardRepository.findByDate).toHaveBeenCalled();
        const calledDate = (cardRepository.findByDate as jest.Mock).mock.calls[0][0] as Date;
        // Verify it sets time to end of day
        expect(calledDate.getHours()).toBe(23);
        expect(calledDate.getMinutes()).toBe(59);
    });

    it('should use current date if no date provided', async () => {
        const cards = [Card.create('id-1', 'Q', 'A', 'T')];
        (cardRepository.findByDate as jest.Mock).mockResolvedValue(cards);

        await useCase.execute();

        expect(cardRepository.findByDate).toHaveBeenCalled();
        const calledDate = (cardRepository.findByDate as jest.Mock).mock.calls[0][0] as Date;
        // Verify it's today (roughly)
        const now = new Date();
        expect(calledDate.getDate()).toBe(now.getDate());
        expect(calledDate.getHours()).toBe(23);
    });
});
