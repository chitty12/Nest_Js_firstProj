import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';

// root module 에 해당함.
// 모듈: @ module {} 데코레이터로 주석이 달린 클래스.
// - 애플리케이션 구조를 구성하는 데 사용하는 메타 데이터를 제공함.
// 모듈이란 밀접하게 관련된 기능 집합으로 구성요소를 구성하는 효과적인 방법(기능별).
@Module({
  imports: [BoardsModule],
})
export class AppModule {}
