import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Auth } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private AuthRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(AuthCredentialsDto: AuthCredentialsDto) {
    this.AuthRepository.create(AuthCredentialsDto);
    return;
  }

  async signIn(
    AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = AuthCredentialsDto;
    const user = await this.AuthRepository.findOne({ where: { userName } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성(Secret + Payload)
      // 중요 정보 제외해야한다.
      const payload = { userName };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else throw new UnauthorizedException('login failed');
  }
}
// salt = await bcrypt.genSalt();
// hashedPw = await bcrypt.hash(password, salt);

// user = this.creat({ username, password: hashedPw });

//

// jwt(JSON Web Token) : 당사자간 정보를 JSON 객체로 안전하게 전송하기위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준
// 정보전달시 유저 권한 등을 체크하기 위해 사용되는 모듈
// Header(토큰에 대한 메타 데이터를 포함: 타입, 해싱 알고리즘, SHA256)
// Payload(유저 정보, 만료 기간, 주제 등등)
// Verify Signature(토큰이 보낸 사람에 의해 서명되어, 변경되지 않았는지 확인하는데 사용되는 서명<사용자가 설정한 Secret Key 포함>)
// client 요청의 headers, payload 와 서버의 secret key 를 이용해 signature 생성.
