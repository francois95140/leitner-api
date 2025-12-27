import { Test, TestingModule } from '@nestjs/testing';
import { AnswerCardUseCase } from './AnswerCard.usecase';
import { CardRepository } from '../domain/CardRepository';
import { Card } from '../domain/Card';
import { NotFoundException } from '@nestjs/common';
import { Category } from '../domain/Category';

describe('AnswerCardUseCase', () => {
    let useCase: AnswerCardUseCase;
    let cardRepository: Partial<CardRepository>;

    beforeEach(async () => {
        cardRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswerCardUseCase,
                {
                    provide: 'CardRepository',
                    useValue: cardRepository,
                },
            ],
        }).compile();

        useCase = module.get<AnswerCardUseCase>(AnswerCardUseCase);
    });

    it('should answer a card correctly and save the update', async () => {
        const card = Card.create('id-1', 'Q', 'A', 'T');
        (cardRepository.findById as jest.Mock).mockResolvedValue(card);

        await useCase.execute('id-1', true);

        expect(cardRepository.findById).toHaveBeenCalledWith('id-1');
        expect(cardRepository.save).toHaveBeenCalled();
        const savedCard = (cardRepository.save as jest.Mock).mock.calls[0][0] as Card;
        expect(savedCard.category).toBe(Category.SECOND);
    });

    it('should throw NotFoundException if card does not exist', async () => {
        (cardRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(useCase.execute('unknown-id', true)).rejects.toThrow(NotFoundException);
        expect(cardRepository.save).not.toHaveBeenCalled();
    });
});
