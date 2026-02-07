import { ApiProperty } from "@nestjs/swagger";

export class UserListResponseDto {
  @ApiProperty({ description: "list id" })
  id: number;
}
