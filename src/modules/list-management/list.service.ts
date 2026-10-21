import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { ListEntity } from "./entities/list.entity.js";
import { DataSource, Repository } from "typeorm";
import { ListItemEntity } from "./entities/list-item.entity.js";
import { CreateListDto, ListUserDto } from "./list.dto.js";
import { ListCategoryEntity } from "./entities/list-category.entity.js";
import { GENERIC_LIST_CATEGORY } from "./list.constants.js";
import { GenericException } from "../../common/exception-filters/generic-exception.js";
import { plainToInstance } from "class-transformer";
import { ItemEntity } from "./entities/item.entity.js";
import { capitalizeWord } from "../../common/helpers/capitalize-word.js";
import { RawListItem } from "./list-item.types.js";
import {
  CreateListItemsDto,
  DeleteListItemDto,
  ModifyListItemDto,
} from "./list-item.dto.js";

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
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createListDto: CreateListDto) {
    return this.dataSource.transaction(async (manager) => {
      const listRepo = manager.getRepository(ListEntity);
      const listItemRepo = manager.getRepository(ListItemEntity);
      const categoryRepo = manager.getRepository(ListCategoryEntity);

      const category = await categoryRepo.findOneBy({
        name_en: GENERIC_LIST_CATEGORY,
      });
      if (!category) {
        throw new GenericException(
          "Generic list category is not configured",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const newList = listRepo.create({
        listCategory: category,
        member: { id: createListDto.memberId },
        name: createListDto.name ?? "List",
      });
      await listRepo.save(newList);

      await this.addItemsToList(newList.id, createListDto, listItemRepo);
      return newList;
    });
  }

  async addItemsToList(
    listId: number,
    data: CreateListItemsDto,
    listItemRepo: Repository<ListItemEntity> = this.listItemRepository,
  ) {
    const newItems: RawListItem[] = data.items.map((item) => {
      const chosenItem = item.name
        ? { freeTextName: item.name, item: null }
        : { item: { id: item.itemId }, freeTextName: null };
      return {
        list: { id: listId },
        quantity: item.quantity,
        price: item.price,
        ...chosenItem,
      };
    });

    const newListItem = listItemRepo.create(newItems);
    await listItemRepo.insert(newListItem);
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
