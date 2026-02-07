import { HttpException, HttpStatus } from "@nestjs/common";
export class GenericException extends HttpException {
  constructor(
    public name: string,
    public httpError: HttpStatus,
  ) {
    super(name, httpError);
  }
}
