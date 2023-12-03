import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Auth } from 'src/entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  // 다른 module에서도 사용할 수 있도록 설정.
})
export class AuthModule {}

// nest g module auth
// 유저 인증을 하는 것이니 유저가 필요 => 유저 데이터를 위한 유저 entitiy 생성

// passport module : JWT 인증처리과정을 쉽게 만들어주는 모듈
