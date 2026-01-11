export type FindUserParams = {
  email: string;
  id: number;
};

export type FindUserParamFields = keyof FindUserParams;
export type FindUserParamFieldValues = FindUserParams[FindUserParamFields];
