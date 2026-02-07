import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListEntity } from "./entities/list.entity.js";
import { Repository } from "typeorm";
import { ListItemEntity } from "./entities/list-item.entity.js";
import {
  CreateListDto,
  CreateListItemDto,
  DeleteListItemDto,
  ListUserDto,
  ModifyListItemDto,
} from "./list.dto.js";
import { ListCategoryEntity } from "./entities/list-category.entity.js";
import { GENERIC_LIST_CATEGORY } from "./list.constants.js";
import { GenericException } from "../../common/exception-filters/generic-exception.js";
import { plainToInstance } from "class-transformer";
import { ItemEntity } from "./entities/item.entity.js";
import { capitalizeWord } from "../../common/helpers/capitalize-word.js";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(ListItemEntity)
    private listItemRepository: Repository<ListItemEntity>,
    @InjectRepository(ListCategoryEntity)
    private listCategoryRepository: Repository<ListCategoryEntity>,
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async create(createListDto: CreateListDto) {
    const categoryId = await this.listCategoryRepository.findOneBy({
      name_en: GENERIC_LIST_CATEGORY,
    });
    const newList = this.listRepository.create({
      listCategory: categoryId!,
      member: { id: createListDto.memberId },
    });

    await this.listRepository.save(newList);
    return newList;
  }

  async addItemToList(data: CreateListItemDto) {
    if (data.freeTextName && data.itemId) {
      throw new GenericException(
        "You should either send free text or item name",
        HttpStatus.BAD_REQUEST,
      );
    }
    const newListItem = this.listItemRepository.create({
      list: { id: data.listId },
      item: { id: data.itemId },
      freeTextName: data.freeTextName,
    });
    await this.listItemRepository.insert(newListItem);
    return newListItem;
  }

  async deleteItemFromList(data: DeleteListItemDto) {
    const foundList = await this.listRepository.findOne({
      where: { id: data.listId },
    });
    if (!foundList) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "This list doesnt exist",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.listItemRepository.delete(data.listItemId);
    return { deletedItemId: data.listItemId, listAffected: data.listId };
  }
  async modifyItemFromList(data: ModifyListItemDto) {
    const foundListItem = await this.listItemRepository.findOneBy({
      id: data.listItemId,
    });

    if (!foundListItem) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "This list item doesnt exist",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const capitalizedName = capitalizeWord(data.name);

    const foundItemId = await this.itemRepository.findOneBy([
      { name_en: capitalizedName },
      { name_es: capitalizedName },
    ]);
    const chosenName = foundItemId ? { id: foundItemId.id } : capitalizedName;
    const field = foundItemId ? "item" : "freeTextName";

    await this.listItemRepository.update(data.listItemId, {
      [field]: chosenName,
    });
    return { modifiedListItem: data.listItemId, newField: capitalizedName };
  }
  async deleteList(
    userId: number,
    listId: number,
  ): Promise<{ deleted: number }> {
    const foundList = await this.listRepository.findOne({
      where: { id: listId, member: { id: userId } },
    });
    if (!foundList) {
      throw new GenericException(
        " This list doesnt exist",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.listRepository.delete({ id: listId });
    return { deleted: listId };
  }
  async getList(userId: number, listId: number) {
    try {
      const userList = await this.listRepository.findOne({
        where: { id: listId, member: { id: userId } },
        relations: {
          listItems: {
            item: true,
          },
        },
      });
      const dto = plainToInstance(ListUserDto, userList, {
        excludeExtraneousValues: true,
      });
      return dto;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserLists(userId: number) {
    const userLists = await this.listRepository.find({
      where: { member: { id: userId } },
    });
    if (userLists.length === 0) return [];
    return userLists;
  }
}
