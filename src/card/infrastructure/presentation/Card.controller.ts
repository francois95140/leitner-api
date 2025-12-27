import { Body, Controller, Get, Param, Patch, Post, Query, HttpCode, UseGuards } from '@nestjs/common';
import { CreateCardUseCase } from '../../application/CreateCard.usecase';
import { GetCardsUseCase } from '../../application/GetCards.usecase';
import { GetQuizzCardsUseCase } from '../../application/GetQuizzCards.usecase';
import { AnswerCardUseCase } from '../../application/AnswerCard.usecase';
import { CreateCardDto } from '../../application/dto/CreateCard.dto';
import { Card } from '../../domain/Card';
import { FakeAuthGuard } from '../../../common/guards/FakeAuthGuard';

@Controller('cards')
@UseGuards(FakeAuthGuard)
export class CardController {
    constructor(
        private readonly createCardUseCase: CreateCardUseCase,
        private readonly getCardsUseCase: GetCardsUseCase,
        private readonly getQuizzCardsUseCase: GetQuizzCardsUseCase,
        private readonly answerCardUseCase: AnswerCardUseCase,
    ) { }

    @Post()
    async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.createCardUseCase.execute(createCardDto);
    }

    @Patch(':cardId/answer')
    @HttpCode(204)
    async answer(@Param('cardId') cardId: string, @Body() body: { isValid: boolean }): Promise<void> {
        return this.answerCardUseCase.execute(cardId, body.isValid);
    }

    @Get('quizz')
    async getQuizz(@Query('date') date: string): Promise<Card[]> {
        return this.getQuizzCardsUseCase.execute(date);
    }

    @Get()
    async getAll(@Query('tags') tags: string[]): Promise<Card[]> {
        const tagsArray = typeof tags === 'string' ? [tags] : tags;
        return this.getCardsUseCase.execute(tagsArray);
    }
}
