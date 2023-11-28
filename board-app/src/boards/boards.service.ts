import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { randomUUID } from 'crypto';

// service 란?
// 소프트웨어 개발내의 공통 개념.
// @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 서비스 인스턴스는 애플리케이션 전체에서 사용가능.
// controller 에서 데이터의 유효성 체크를 하거나 DB에 아이템을 생성하는 등의 작업을 처리.

// nest g service boards --no-spec

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getList(): Board[] {
    return this.boards;
  }

  // createBoard(title: string, content: string) {
  createBoard(createBoardDto: CreateBoardDto) {
    // const title = createBoardDto.title;
    // const content = createBoardDto.content;

    const { title, content } = createBoardDto;

    const board: Board = {
      id: randomUUID(),
      title,
      content,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== id);

    if (!found) {
      throw new NotFoundException();
    }
  }

  updateBoardContent(id: string, content: string): Board {
    const board = this.getBoardById(id);
    board.content = content;
    return board;
  }
}

// pipe 필요 모듈
// class-validator, class-transformer (npm i class-validator class-transformer --save)
