import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Auth } from 'src/entity/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

// nest g module auth
// 유저 인증을 하는 것이니 유저가 필요 => 유저 데이터를 위한 유저 entitiy 생성
