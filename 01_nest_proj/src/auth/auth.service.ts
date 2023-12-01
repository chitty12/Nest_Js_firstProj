import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Auth } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private AuthRepository: Repository<Auth>,
  ) {}

  // salt = await bcrypt.genSalt();
  // hashedPw = await bcrypt.hash(password, salt);

  // user = this.creat({ username, password: hashedPw });

  //
}
