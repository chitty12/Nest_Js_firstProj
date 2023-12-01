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
