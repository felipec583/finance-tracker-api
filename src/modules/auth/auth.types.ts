import { ListEntity } from "../list-management/entities/list.entity.js";

export type LoginReponse = {
  id: number;
  name: string;
  email: string;
  lists: ListEntity[];
  accessToken: string;
};
