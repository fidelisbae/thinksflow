import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  CreateBoardDto,
  DeleteBoardDto,
  UpdateBoardDto,
} from './dto/board.dto';
import { BoardEntity } from './entities/board.entity';

@Controller('board')
@ApiTags('게시글')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/')
  @ApiOperation({
    summary: '게시글 작성 API',
    description: '게시글 생성',
  })
  @ApiCreatedResponse({ description: '게시글이 작성되었습니다.' })
  async create(@Body() dto: CreateBoardDto): Promise<string> {
    await this.boardService.create(dto);
    return '게시글이 작성되었습니다.';
  }

  @Get('/')
  @ApiOperation({
    summary: '게시글 조회 API',
    description: '전체 게시글 조회',
  })
  async fetch(): Promise<Partial<BoardEntity[]>> {
    return await this.boardService.fetch();
  }

  @Put('/')
  @ApiOperation({
    summary: '게시글 수정 API',
    description: '비밀번호가 일치하면 게시글 수정',
  })
  @ApiOkResponse({ description: '게시글을 수정했습니다.' })
  async update(@Body() dto: UpdateBoardDto): Promise<string> {
    await this.boardService.update(dto);
    return '게시글을 수정했습니다.';
  }

  @Delete('/')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description: '비밀번호가 일치하면 게시글 삭제',
  })
  @ApiOkResponse({ description: '게시글을 삭제했습니다.' })
  async delete(@Body() dto: DeleteBoardDto): Promise<string> {
    const result = await this.boardService.delete(dto);
    return result ? '게시글을 삭제했습니다.' : '게시글 삭제에 실패했습니다.';
  }
}
