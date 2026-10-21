import {
  ApiPropertyOptional,
  PickType,
  ApiProperty,
  IntersectionType,
} from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsOptional, ValidateIf } from "class-validator";
import {
  CreateListItemsDto,
  DeleteListItemDto,
  ListItemDto,
} from "./list-item.dto.js";

export class CreateListResponseDto {
  @ApiProperty({
    type: [Number],
    example: 1,
  })
  ownerId: number;
  @ApiProperty({
    type: [Date],
    example: "2026-02-03T23:59:42.273Z",
  })
  createdAt: Date;
  @ApiProperty({
    type: [Number],
    example: 11,
  })
  listId: number;
}

export class CreateListDto extends IntersectionType(CreateListItemsDto) {
  @IsNumber()
  @Exclude()
  @ValidateIf(() => false)
  memberId: number;

  @ApiProperty({ example: "List World " })
  @IsOptional()
  @Expose()
  name?: string;
}

export class ListUserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  name: string | null;

  @ApiProperty({ isArray: true, type: () => ListItemDto })
  @Expose()
  @Type(() => ListItemDto)
  listItems: ListItemDto[];
}

export class DeleteListDto extends PickType(DeleteListItemDto, ["listId"]) {}
