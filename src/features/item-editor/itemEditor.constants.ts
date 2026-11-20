import type { ShoppingItemCategory } from '../../lib/shopping-items';

export const units = ['un', 'kg', 'g', 'pct', 'L', 'cx'];

export const categories = [
  { label: 'Padaria', value: 'PADARIA' },
  { label: 'Farmácia', value: 'FARMACIA' },
  { label: 'Mercado', value: 'MERCADO' },
  { label: 'Limpeza', value: 'LIMPEZA' },
  { label: 'Papelaria', value: 'PAPELARIA' },
  { label: 'Hortifruti', value: 'HORTIFRUTI' },
] as const satisfies readonly { label: string; value: ShoppingItemCategory }[];

export const categoryLabels: Record<ShoppingItemCategory, string> = {
  MERCEARIA: 'Mercearia',
  LATICINIOS: 'Laticínios',
  OLEOS_CONDIMENTOS: 'Óleos e condimentos',
  PADARIA: 'Padaria',
  HORTIFRUTI: 'Hortifruti',
  LIMPEZA: 'Limpeza',
  HIGIENE_PESSOAL: 'Higiene Pessoal',
  FARMACIA: 'Farmácia',
  MERCADO: 'Mercado',
  PAPELARIA: 'Papelaria',
  OUTROS: 'Outros',
};
