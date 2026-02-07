import { ApiPropertyOptional, PickType, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsNumber, IsString, ValidateIf } from "class-validator";
interface rawListItem {
  id: number;
  quantity: number | null;
  freeTextName: string | null;
  item: {
    id: number;
    name_en: string;
    name_es: string;
  };
}

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

export class CreateListDto {
  @ApiProperty()
  @IsNumber()
  memberId: number;
}

export class ListItemDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @Transform(
    ({ obj }: { obj: rawListItem }) => {
      return obj.freeTextName || obj.item.name_es;
    },
    { toClassOnly: true },
  )
  name: string;
  @ApiProperty({ example: 4 })
  @Expose()
  quantity: number | null;
  @Exclude()
  name_en: string;
}

export class ListUserDto {
  @ApiProperty()
  @Expose()
  id: number;
  @ApiProperty({ isArray: true, type: () => ListItemDto })
  @Expose()
  @Type(() => ListItemDto)
  listItems: ListItemDto[];
}

export class CreateListItemDto {
  @ApiPropertyOptional()
  @ValidateIf((dto: CreateListItemDto) => typeof dto.itemId === "undefined")
  @IsString()
  freeTextName?: string;
  @ApiPropertyOptional()
  @ValidateIf(
    (dto: CreateListItemDto) => typeof dto.freeTextName === "undefined",
  )
  @IsNumber()
  itemId?: number;
  @ApiProperty()
  @IsNumber()
  listId: number;
}

export class ModifyListItemDto {
  @ApiProperty()
  @IsNumber()
  listItemId: number;
  @ApiProperty()
  @IsString()
  name: string;
}

export class DeleteListItemDto extends PickType(ModifyListItemDto, [
  "listItemId",
]) {
  @ApiProperty()
  @IsNumber()
  listId: number;
}

export class DeleteListDto extends PickType(DeleteListItemDto, ["listId"]) {}
