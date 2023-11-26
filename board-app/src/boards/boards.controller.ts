import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

// nest g controller boards --no-spec
// --no-spec : 테스트를 위한 소스코드 생성x
@Controller('boards')
export class BoardsController {
  // 1. boardsService 파라미터에 BoardsService 객체를 타입으로 지정
  boardsService: BoardsService;
  // 3. 타입스크립트에서는 선언 값만 객체의 프로퍼티로 사용가능하기 때문에 boardsService: BoardsService; 선언
  constructor(boardsService: BoardsService) {
    // 2. BoardsController 클래스 안에서 사용하기 위해서 this.boardsService 프로퍼티에 boardsService 파라미터를 할당
    this.boardsService = boardsService;
  }
  // 4. boardsService 프로퍼티를 이용해 BoardsController 클래스안에서 활용!

  //  접근 제한자(private)를 이용해서 소스 간단하게 하기
  // constructor(private boardsService: BoardsService){
  //     this.boardsService.getAllBoards()
  // }

  @Get('/')
  getList(): Board[] {
    return this.boardsService.getList();
  }

  @Post('/create')
  createBoard(
    // @Body('title') title: string,
    // @Body('content') content: string,
    // @Body body : body 내의 정보를 모두 가져옴
    @Body() createBoardDto: CreateBoardDto

  ): Board {
    // return this.boardsService.createBoard(title, content);
    return this.boardsService.createBoard(createBoardDto);
  }
}

// providers 란?
// 대부분의 기본 Nest 클래스는 서비스, 레포지토리, 팩토리, 헬퍼 등 프로바이더로 취급 가능.
// 프로바이더 : 종속성으로 주입할 수 있다. (controller에 종속된 객체인 service 등을 통해 기능 구현.)
// - 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 '연결'하는 기능은 대부분 Nest 런타임 시스템에 위임.



