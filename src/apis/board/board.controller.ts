import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import {
  CreateBoardDto,
  DeleteBoardDto,
  UpdateBoardDto,
} from './dto/board.dto';
import { BoardEntity } from './entities/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/')
  async create(@Body() dto: CreateBoardDto): Promise<string> {
    await this.boardService.create(dto);
    return '게시글이 작성되었습니다.';
  }

  @Get('/')
  async fetch(): Promise<Partial<BoardEntity[]>> {
    return await this.boardService.fetch();
  }

  @Put('/')
  async update(@Body() dto: UpdateBoardDto): Promise<string> {
    await this.boardService.update(dto);
    return '게시글을 수정했습니다.';
  }

  @Delete('/')
  async delete(@Body() dto: DeleteBoardDto): Promise<string> {
    const result = await this.boardService.delete(dto);
    return result ? '게시글을 삭제했습니다.' : '게시글 삭제에 실패했습니다.';
  }
}
