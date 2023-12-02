// passport-jwt모듈:

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/entity/auth.entity';

@Injectable()
// JwtStrategy를 다른곳에 주입할수있다.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth)
    private AuthRepository: Repository<Auth>,
  ) {
    super({
      secretOrKey: 'secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userName } = payload;
    const user: Auth = await this.AuthRepository.findOne(userName);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
