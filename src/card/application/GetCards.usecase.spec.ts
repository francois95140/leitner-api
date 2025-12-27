import { Test, TestingModule } from '@nestjs/testing';
import { GetCardsUseCase } from './GetCards.usecase';
import { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';
import { Category } from '../domain/Category';

describe('GetCardsUseCase', () => {
    let useCase: GetCardsUseCase;
    let cardRepository: Partial<CardRepository>;

    beforeEach(async () => {
        cardRepository = {
            findAll: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCardsUseCase,
                {
                    provide: 'CardRepository',
                    useValue: cardRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetCardsUseCase>(GetCardsUseCase);
    });

    it('should return all cards when no tags provided', async () => {
        const cards = [Card.create('id-1', 'Q', 'A', 'T'), Card.create('id-2', 'Q2', 'A2', 'T2')];
        (cardRepository.findAll as jest.Mock).mockResolvedValue(cards);

        const result = await useCase.execute();

        expect(result).toEqual(cards);
        expect(cardRepository.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return filtered cards when tags provided', async () => {
        const tags = ['Tag1'];
        const cards = [Card.create('id-1', 'Q', 'A', 'Tag1')];
        (cardRepository.findAll as jest.Mock).mockResolvedValue(cards);

        const result = await useCase.execute(tags);

        expect(result).toEqual(cards);
        expect(cardRepository.findAll).toHaveBeenCalledWith(tags);
    });
});
