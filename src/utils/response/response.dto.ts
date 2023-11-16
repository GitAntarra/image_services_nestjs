import { IsArray, IsString } from 'class-validator';

export class ResponseDto<M, D> {
  readonly err: boolean = false;

  @IsString()
  readonly message: M;

  @IsArray()
  readonly data: D;

  constructor(message: M, data: D) {
    this.err = false;
    this.message = message;
    this.data = data;
  }
}
