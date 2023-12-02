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
