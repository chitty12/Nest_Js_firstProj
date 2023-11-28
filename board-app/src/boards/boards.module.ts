import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';

// nest(using nest cli) g(generate) module boards(name)

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

// controller : 컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환.
// @Controller 데코레이터로 클래스를 데코레이션하여 정의됨.
// ex) @Controller('/boards') : 보드에관한 요청을 처리하는 컨트롤러

// handler : @Get, @Post, @Delete
