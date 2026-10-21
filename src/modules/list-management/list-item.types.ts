export interface RawListItem {
  quantity?: number;
  price?: number;
  freeTextName?: string | null;
  item?: { id?: number } | null;
  list: { id: number };
}

export interface rawListItem {
  id: number;
  quantity: number;
  price: number;
  freeTextName: string | null;
  item: {
    id: number;
    name_en: string;
    name_es: string;
  };
}
