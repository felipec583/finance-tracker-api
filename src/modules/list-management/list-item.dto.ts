import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { rawListItem } from "./list-item.types.js";

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
  quantity: number;

  @ApiProperty({ example: 4 })
  @Expose()
  price: number;
  @Exclude()
  name_en: string;
}

export class CreateListItemsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    example: [
      {
        name: "Bobi",
        quantity: 1,
        price: 1,
        itemId: 5,
      },
    ],
  })
  @Type(() => CreateListItemDto)
  items: CreateListItemDto[];
}

export class CreateListItemDto {
  @ApiPropertyOptional()
  @ValidateIf((dto: CreateListItemDto) => typeof dto.itemId === "undefined")
  @IsString()
  name?: string | null;
  @ApiPropertyOptional()
  @ValidateIf((dto: CreateListItemDto) => typeof dto.name === "undefined")
  @IsNumber()
  itemId?: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsOptional()
  price?: number;
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
