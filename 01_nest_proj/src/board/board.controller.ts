import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
  UsePipes,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create_board.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  getBoards() {
    return this.boardService.getBoards();
  }

  @Get('/:id')
  getBoard(@Param('id') id: number) {
    return this.boardService.getBoard(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    // ParseIntPipe : 파라미터가 int타입인지 여부를 체크 (아닐경우 에러)
    return this.boardService.deleteBoard(id);
  }
}
