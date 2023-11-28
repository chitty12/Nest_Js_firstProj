import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}

// typeORM = typescript + ORM 프레임워크
// ORM : DB 종류에 상관없이 코딩 가능
// 쿼리문 대신, 코드작성으로 사용 용이, 재사용성 증가, DBMS에 종속적인 쿼리를 사용하지 않아, DB변경이 용이
// 단점: 테이블간 관계가 복잡해지고, 쿼리 복잡해질수록 구현이 어렵다.
