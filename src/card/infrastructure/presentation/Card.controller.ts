import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCardUseCase } from '../../application/CreateCard.usecase';
import { CreateCardDto } from '../../application/dto/CreateCard.dto';
import { Card } from '../../domain/Card';

@Controller('cards')
export class CardController {
    constructor(private readonly createCardUseCase: CreateCardUseCase) { }

    @Post()
    async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.createCardUseCase.execute(createCardDto);
    }

    @Get()
    async getAll(): Promise<Card[]> {

        return [];
    }
}
