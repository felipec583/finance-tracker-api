import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListEntity } from "./entities/list.entity.js";
import { Repository } from "typeorm";
import { ListItemEntity } from "./entities/list-item.entity.js";
import { CreateListDto } from "./list.dto.js";
import { UserService } from "../user/user.service.js";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(ListItemEntity)
    private listItemRepository: Repository<ListItemEntity>,
    private userService: UserService,
  ) {}

  async create(createListDto: CreateListDto) {}
}
