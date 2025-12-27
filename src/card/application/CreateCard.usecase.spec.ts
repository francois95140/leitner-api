import { Test, TestingModule } from '@nestjs/testing';
import { CreateCardUseCase } from './CreateCard.usecase';
import { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';
import { Category } from '../domain/Category';

// Mock uuid to avoid ESM/CJS issues with jest
jest.mock('uuid', () => ({
    v4: () => 'test-uuid-v4',
}));

describe('CreateCardUseCase', () => {
    let useCase: CreateCardUseCase;
    let cardRepository: Partial<CardRepository>;

    beforeEach(async () => {
        cardRepository = {
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCardUseCase,
                {
                    provide: 'CardRepository',
                    useValue: cardRepository,
                },
            ],
        }).compile();

        useCase = module.get<CreateCardUseCase>(CreateCardUseCase);
    });

    it('should create a new card and save it', async () => {
        const dto = {
            question: 'Question?',
            answer: 'Answer',
            tag: 'Tag',
        };

        const result = await useCase.execute(dto);

        expect(result).toBeInstanceOf(Card);
        expect(result.question).toBe(dto.question);
        expect(result.answerString).toBe(dto.answer);
        expect(result.tag).toBe(dto.tag);
        expect(result.category).toBe(Category.FIRST);

        // Check repository was called
        expect(cardRepository.save).toHaveBeenCalledWith(result);
    });
});
