import { api } from './api';

export type ShoppingItemCategory =
  | 'MERCEARIA'
  | 'LATICINIOS'
  | 'OLEOS_CONDIMENTOS'
  | 'PADARIA'
  | 'HORTIFRUTI'
  | 'LIMPEZA'
  | 'HIGIENE_PESSOAL'
  | 'FARMACIA'
  | 'MERCADO'
  | 'PAPELARIA'
  | 'OUTROS';

export type ShoppingItemResponse = {
  id: number;
  name: string;
  quantity: string | null;
  category: ShoppingItemCategory;
  completed: boolean;
  createdAt: string;
};

export type ShoppingListResponse = {
  pendingCount: number;
  pendingItems: ShoppingItemResponse[];
  completedCount: number;
  completedItems: ShoppingItemResponse[];
};

export type ShoppingItemRequest = {
  name: string;
  quantity: string | null;
  category: ShoppingItemCategory;
};

/** Busca itens pendentes e concluídos da lista. */
export function getShoppingItems() {
  return api.get<ShoppingListResponse>('/api/v1/shopping-items');
}

/** Cadastra um item na lista de compras. */
export function createShoppingItem(item: ShoppingItemRequest) {
  return api.post<ShoppingItemResponse>('/api/v1/shopping-items', item);
}

/** Atualiza os dados de um item existente. */
export function updateShoppingItem(id: number, item: ShoppingItemRequest) {
  return api.put<ShoppingItemResponse>('/api/v1/shopping-items/' + id, item);
}

/** Alterna um item entre pendente e concluído. */
export function toggleShoppingItemCompletion(id: number) {
  return api.patch<ShoppingItemResponse>('/api/v1/shopping-items/' + id + '/toggle');
}

/** Exclui um item da lista. */
export function deleteShoppingItem(id: number) {
  return api.delete<void>('/api/v1/shopping-items/' + id);
}

/** Exclui todos os itens concluídos da lista. */
export function clearCompletedShoppingItems() {
  return api.delete<void>('/api/v1/shopping-items/completed');
}
