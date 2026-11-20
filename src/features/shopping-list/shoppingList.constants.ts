import type { ShoppingItemCategory } from '../../lib/shopping-items';

export const quickAddCategories = [
  'Mercearia',
  'Hortifrúti',
  'Laticínios',
  'Padaria',
  'Limpeza',
  'Higiene Pessoal',
] as const;

export type QuickAddCategory = (typeof quickAddCategories)[number];

export const categoryLabels: Record<ShoppingItemCategory, string> = {
  MERCEARIA: 'Mercearia',
  LATICINIOS: 'Laticínios',
  OLEOS_CONDIMENTOS: 'Óleos e condimentos',
  PADARIA: 'Padaria',
  HORTIFRUTI: 'Hortifrúti',
  LIMPEZA: 'Limpeza',
  HIGIENE_PESSOAL: 'Higiene Pessoal',
  FARMACIA: 'Farmácia',
  MERCADO: 'Mercado',
  PAPELARIA: 'Papelaria',
  OUTROS: 'Outros',
};

export const categoryApiValues: Record<QuickAddCategory, ShoppingItemCategory> = {
  Mercearia: 'MERCEARIA',
  Hortifrúti: 'HORTIFRUTI',
  Laticínios: 'LATICINIOS',
  Padaria: 'PADARIA',
  Limpeza: 'LIMPEZA',
  'Higiene Pessoal': 'HIGIENE_PESSOAL',
};
