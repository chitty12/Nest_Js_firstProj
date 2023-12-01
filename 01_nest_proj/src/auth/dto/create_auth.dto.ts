import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
