import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create_board.dto';

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

  async createBoard(CreateBoardDto: CreateBoardDto) {
    return await this.boardRepository.save(CreateBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

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
