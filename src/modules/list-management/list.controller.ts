import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard.js";
import { ListService } from "./list.service.js";
import { User } from "../user/user.decorator.js";
import type { UserPayloadInfo } from "../auth/auth.types.js";
import {
  CreateListDto,
  CreateListResponseDto,
  ListUserDto,
} from "./list.dto.js";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequireAuth } from "../../common/decorators/common.decorator.js";
import {
  CreateListItemsDto,
  DeleteListItemDto,
  ModifyListItemDto,
} from "./list-item.dto.js";
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller("lists")
export class ListController {
  constructor(private readonly listService: ListService) {}
  @Post("/")
  @RequireAuth({
    summary: "Create List",
    okResponse: true,
    succesfulResponseParams: {
      type: CreateListResponseDto,
      description: "New List Created",
    },
  })
  async createList(
    @User() user: UserPayloadInfo,
    @Body() listData: CreateListDto,
  ): Promise<CreateListResponseDto> {
    const newList = await this.listService.create({
      memberId: user.id,
      name: listData?.name,
      items: listData.items,
    });
    return { ownerId: user.id, createdAt: new Date(), listId: newList.id };
  }

  @Patch("/list-item")
  @ApiOperation({ summary: "Modify list item name" })
  async modifyItemOnList(
    @Body(new ValidationPipe()) modifyListItemDto: ModifyListItemDto,
  ) {
    const modifiedListItem =
      await this.listService.modifyItemFromList(modifyListItemDto);
    return modifiedListItem;
  }

  @Post("/:id/list-item")
  @ApiOperation({ summary: "Add list item to list" })
  async addItemToList(
    @Body(new ValidationPipe()) createListItemsDto: CreateListItemsDto,
    @Param("id", ParseIntPipe) id: number,
  ) {
    const modifiedListItem = await this.listService.addItemsToList(
      id,
      createListItemsDto,
    );
    return modifiedListItem;
  }

  @Delete("/list-item")
  @ApiOperation({ summary: "Delete list item to list" })
  async deleteItemFromList(
    @Body(new ValidationPipe()) deleteListItemDto: DeleteListItemDto,
  ) {
    const deletedListItem =
      await this.listService.deleteItemFromList(deleteListItemDto);
    return deletedListItem;
  }
  @Delete("/:id")
  @ApiOperation({ summary: "Delete list" })
  async deleteList(
    @Param("id", ParseIntPipe) id: number,
    @User() user: UserPayloadInfo,
  ) {
    const deletedListItem = await this.listService.deleteList(user.id, id);
    return deletedListItem;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get specific list " })
  @ApiOkResponse({ type: ListUserDto })
  async getList(
    @Param("id", ParseIntPipe) params: string,
    @User() userInfo: UserPayloadInfo,
  ) {
    return await this.listService.getList(userInfo.id, +params);
  }
}
