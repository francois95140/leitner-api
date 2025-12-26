import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCardUseCase } from '../../application/CreateCard.usecase';
import { GetCardsUseCase } from '../../application/GetCards.usecase';
import { CreateCardDto } from '../../application/dto/CreateCard.dto';
import { Card } from '../../domain/Card';

@Controller('cards')
export class CardController {
    constructor(
        private readonly createCardUseCase: CreateCardUseCase,
        private readonly getCardsUseCase: GetCardsUseCase,
    ) { }

    @Post()
    async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.createCardUseCase.execute(createCardDto);
    }

    @Get()
    async getAll(@Query('tags') tags: string[]): Promise<Card[]> {
        const tagsArray = typeof tags === 'string' ? [tags] : tags;
        return this.getCardsUseCase.execute(tagsArray);
    }
}
