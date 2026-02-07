import { Injectable } from "@nestjs/common";
import { ItemEntity } from "./entities/item.entity.js";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ItemService {
  @InjectRepository(ItemEntity)
  private listRepository: Repository<ItemEntity>;

  async create() {}
  async getAll() {}
}
