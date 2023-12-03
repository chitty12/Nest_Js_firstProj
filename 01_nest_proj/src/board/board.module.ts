import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Board } from 'src/entity/board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // token 인증된 user 객체 받아와서 사용하기 위해 AuthModule import함.
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}

// providers 란?
// 대부분의 기본 Nest 클래스는 서비스, 레포지토리, 팩토리, 헬퍼 등 프로바이더로 취급 가능.
// 프로바이더 : 종속성으로 주입할 수 있다. (controller에 종속된 객체인 service 등을 통해 기능 구현.)
// - 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 '연결'하는 기능은 대부분 Nest 런타임 시스템에 위임.
