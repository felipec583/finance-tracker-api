import { Controller, Get, UseGuards } from "@nestjs/common";
import { ListService } from "../list-management/list.service.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { User } from "./user.decorator.js";
import type { UserPayloadInfo } from "../auth/auth.types.js";
import { UserListResponseDto } from "./user.dto.js";
import { ApiOkResponse } from "@nestjs/swagger";
@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly listService: ListService) {}

  @Get("/lists")
  @ApiOkResponse({ type: [UserListResponseDto] })
  async getLists(
    @User() userInfo: UserPayloadInfo,
  ): Promise<UserListResponseDto[]> {
    return await this.listService.getUserLists(userInfo.id);
  }
}
