import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeOrm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// pipe는 @Injectable() 데코레이터로 주석이 달린 클래스.
// - data transformation 과 data validation 을 위해 사용됨.
// - 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동.
// - Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동.
// - 라우트 핸들러가 처리하는 인수에 대해 작동
// - 메소드를 바로 직전에 작동해서 메소드로 향하는 인수에 대해 변환할 것이 있으면 변환하고 유효성 체크를 위해서도 호출
// - 사용법 : Handler-level pipes, Parameter-level pipes, Global-level pipes

// pipe 필요 모듈
// class-validator, class-transformer (npm i class-validator class-transformer --save)
