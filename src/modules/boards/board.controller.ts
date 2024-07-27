import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { Board } from 'src/models/board.schema'
import { BoardService } from 'src/modules/boards/board.service'

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getBoards() {
    return 'get list board'
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(id)
  }

  @Post()
  createBoard() {
    return 'create board'
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: any,
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardDto)
  }

  @Put('/supports/moving_cards')
  async moveCardToOtherColumn(@Body() updateBoardDto: any): Promise<void> {
    return this.boardService.moveCardToOtherColumn(updateBoardDto)
  }
}
