import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create_board.dto';
import { Auth } from 'src/entity/auth.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id: id } });

    if (!board) {
      throw new NotFoundException('아무런 정보가 없음');
    }

    return board;
  }

  // 쿼리문이용하여 특정 board 가져오기.
  // const query = this.boardRepository.createQueryBuilder('board');
  // query.where('board.userId = :userId', {userIde: user.id});

  // const boards = await this.query.getMany();
  // return boards;

  async createBoard(
    CreateBoardDto: CreateBoardDto,
    user: Auth,
  ): Promise<Board> {
    return await this.boardRepository.save({ CreateBoardDto, user });
  }

  async deleteBoard(id: number, user: Auth): Promise<void> {
    // 작성한 유저만 삭제할 수 있도록 user 정보 추가
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // async updateBoard(
  //   id: number,
  //   title: string,
  //   content: string,
  // ): Promise<Board> {
  //   const board = await this.boardRepository.update();
  // }
}

// remove() vs delete()
// remove : 무조건 존재하는 아이템을 삭제. 없으면 에러발생
// delete : 존재하지 않는 아이템의 경우에는 아무런 영향 없음.

// service 란?
// 소프트웨어 개발내의 공통 개념.
// @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 서비스 인스턴스는 애플리케이션 전체에서 사용가능.
// controller 에서 데이터의 유효성 체크를 하거나 DB에 아이템을 생성하는 등의 작업을 처리.

// nest g service boards --no-spec
