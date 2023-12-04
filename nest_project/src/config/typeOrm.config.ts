import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: Number(3306),
//   username: 'root',
//   password: '1234',
//   database: 'nest',
//   entities: [__dirname + '/src/entity/*.ts'],
//   synchronize: false,
// };
// 정적인 객체로 정의하는 방법.
// 정적설정? 코드 상에서 직접 설정 객체를 정의하고 사용하는 방법. 실행 중 변경되지 않는다.

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: 'localhost',
  port: Number(3306),
  username: 'root',
  password: '1234',
  database: 'nest',
  entities: [__dirname + '/src/entity/*.ts'],
  synchronize: false,
});
// 동적인 객체로 정의하는 방법 : 호출될 때마다 매번 새로운 설정 객체를 반환함.(비동기)
// 동적 설정? 설정이 환경에 따라 다르거나, 런타임 중에 변경 가능한 경우에 사용. 코드가 실행될 때마다 새로운 값으로 생성됨.
