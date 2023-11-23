import { Controller, Get } from '@nestjs/common';

// nest g controller boards --no-spec
// --no-spec : 테스트를 위한 소스코드 생성x
@Controller('boards')
export class BoardsController {}

// providers 란?
// 대부분의 기본 Nest 클래스는 서비스, 레포지토리, 팩토리, 헬퍼 등 프로바이더로 취급 가능.
// 프로바이더 : 종속성으로 주입할 수 있다. (controller에 종속된 객체인 service 등을 통해 기능 구현.)
// - 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 '연결'하는 기능은 대부분 Nest 런타임 시스템에 위임.

// service 란?
// 소프트웨어 개발내의 공통 개념.
// @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 서비스 인스턴스는 애플리케이션 전체에서 사용가능.
// controller 에서 데이터의 유효성 체크를 하거나 DB에 아이템을 생성하는 등의 작업을 하는 부분을 처리.
