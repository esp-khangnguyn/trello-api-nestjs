import { Body, Controller, Post } from '@nestjs/common'
import { Card } from 'src/models/card.shema'
import { CardService } from 'src/modules/cards/card.service'

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createBookDto: any): Promise<Card> {
    console.log('Posting')

    try {
      const createdCard = await this.cardService.create(createBookDto)
      return createdCard
    } catch (error) {
      console.log(error)
    }
    return this.cardService.create(createBookDto)
  }
}
