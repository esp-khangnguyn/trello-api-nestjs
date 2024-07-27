import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common'
import { ResponseData } from 'src/global/globalClass'
import { HttpStatus } from 'src/global/globalEnum'
import { Column } from 'src/models/column.schema'
import { ColumnService } from './column.service'

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async create(@Body() createColumnDto: any): Promise<Column> {
    const createdColumn = await this.columnService.create(createColumnDto)
    return createdColumn
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatecolumnDto: any,
  ): Promise<ResponseData<Column>> {
    try {
      const updatedColumn = await this.columnService.update(id, updatecolumnDto)
      return new ResponseData<Column>(
        updatedColumn,
        HttpStatus.SUCCESS,
        'Update column successfully',
      )
    } catch (error) {
      return new ResponseData<Column>(
        null,
        HttpStatus.ERROR,
        'Update column failed',
      )
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.columnService.delete(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
