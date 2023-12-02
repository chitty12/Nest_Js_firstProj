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

  async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { userName, password } = AuthCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(password, salt);

    await this.AuthRepository.create({
      userName,
      password: hashedPw,
    });

    return 'signUP success!';
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

// jwt(JSON Web Token) : 당사자간 정보를 JSON 객체로 안전하게 전송하기위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준
// 정보전달시 유저 권한 등을 체크하기 위해 사용되는 모듈
// Header(토큰에 대한 메타 데이터를 포함: 타입, 해싱 알고리즘, SHA256)
// Payload(유저 정보, 만료 기간, 주제 등등)
// Verify Signature(토큰이 보낸 사람에 의해 서명되어, 변경되지 않았는지 확인하는데 사용되는 서명<사용자가 설정한 Secret Key 포함>)
// client 요청의 headers, payload 와 서버의 secret key 를 이용해 signature 생성.

// 토큰을 가지고 요청을 보낼 때 서버에서는 유효 체크 => 유효하다면 payload의 정보가 DB에 있는지 체크 => 있다면 해당 유저객체를 DB에서 가져옴.

// 해시 함수 : 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수
// 원래의 데이터(key) => 해시 함수를 수행한 결과값(hash value)  :  hashing 하다
// hash collision : 서로 다른 두 개의 키가 같은 해시값을 가지는 경우.
// 항상 1:1인 경우로 만드는 것 자체도 거의 불가능하지만, 만들더라도 메모리 차지가 큼 => 해시 충돌을 최소화하고 충돌에 대비한 대응 방안을 만드는 것이 더 중요!
// 해시값으로 키 유추불가, 같은 키에 대해 항상 같은 해시값을 반환.
