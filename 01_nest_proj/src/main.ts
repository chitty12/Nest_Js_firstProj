import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();

// express에는 winston 이라는 모듈을 주로 이용하나 nestjs는 built-in 되어있는 logger 사용
// 로그 종류
// log : 중요한 정보의 범용 로깅
// warning : 치명적이지 않은 처리되지 않은 문제
// error :  치명적인 처리되지 않은 문제
// debug : 오류 발생시 로직을 디버그하는데 도움되는 유용한 정보
// verbose : 응용 프로그램 동작에 대한 통찰력을 제공하는 정보(운영자 용)
