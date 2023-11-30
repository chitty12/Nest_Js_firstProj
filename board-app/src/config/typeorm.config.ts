import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  migrations: [__dirname + '/migrations/**/*{ts,.js}'],
  migrationsRun: false,

  type: 'mysql',
  host: 'localhost',
  port: Number(3306),
  username: 'nestUser',
  password: 'nestUser12!@',
  database: 'nest',

  entities: [Board],

  synchronize: false,
  // 객체와 테이블 동기화할 때.
  // entities : 객체가 위치하는 폴더
};
