import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';

@Module({
  imports: [
    BoardsModule,
    // forRootAsync : 비동기적으로 typeORM을 설정하기 위한 메서드
    // useFactory : 팩토리함수를 지정하는 데 사용되는 메서드. 팩토리함수는 비동기적으로 호출되고, 모듈의 설정 객체를 return.
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    // 정적인 경우, forRoot() 사용
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
