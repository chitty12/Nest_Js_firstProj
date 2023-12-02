import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return this.AuthService.signUp(AuthCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto) {
    return this.AuthService.signIn(AuthCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  // jwt.strategy 내의 validate 메소드에서 return user를 이용해 요청값에 user객체를 넣어주기위한 방법
  // 없으면 req에 user 정보가 안담겨있음.
  test(@Req() req) {
    console.log('req', req);
  }
}

// @UseGuards() : 인증 미들웨어. 지정된 경로로 통과할 수 있는 사람과 불허되는 사람을 서버에 알려줌.
// 미들웨어가 불러지는 순서 (called)
// middleware => guard => interceptor => pipe => controller => service =>controller => interceptor => filter => client
