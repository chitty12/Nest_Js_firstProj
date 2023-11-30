import { Injectable, NotFoundException } from '@nestjs/common';
// import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

// service 란?
// 소프트웨어 개발내의 공통 개념.
// @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 서비스 인스턴스는 애플리케이션 전체에서 사용가능.
// controller 에서 데이터의 유효성 체크를 하거나 DB에 아이템을 생성하는 등의 작업을 처리.

// nest g service boards --no-spec

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  private boards: Board[] = [];

  async create(createBoardDto: CreateBoardDto) {
    return await this.boardRepository.save(createBoardDto);
  }

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



// pipe는 @Injectable() 데코레이터로 주석이 달린 클래스.
// - data transformation 과 data validation 을 위해 사용됨.
// - 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동.
// - Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동.
// - 라우트 핸들러가 처리하는 인수에 대해 작동
// - 메소드를 바로 직전에 작동해서 메소드로 향하는 인수에 대해 변환할 것이 있으면 변환하고 유효성 체크를 위해서도 호출
// - 사용법 : Handler-level pipes, Parameter-level pipes, Global-level pipes

// pipe 필요 모듈
// class-validator, class-transformer (npm i class-validator class-transformer --save)

