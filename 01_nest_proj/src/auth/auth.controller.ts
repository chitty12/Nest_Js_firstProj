import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.AuthService.signUp(AuthCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto) {
    return this.AuthService.signIn(AuthCredentialsDto);
  }
}
