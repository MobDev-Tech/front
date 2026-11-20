import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { ApiError } from '../../lib/api';
import {
  createShoppingItem,
  updateShoppingItem,
  type ShoppingItemCategory,
} from '../../lib/shopping-items';
import { categories, categoryLabels, units } from './itemEditor.constants';

export function useItemEditorController() {
  const params = useLocalSearchParams<{
    itemId?: string;
    name?: string;
    quantity?: string;
    category?: ShoppingItemCategory;
  }>();
  const isEditing = typeof params.itemId === 'string';
  const [name, setName] = useState(params.name ?? '');
  const [quantity, setQuantity] = useState(params.quantity ?? '');
  const [selectedUnit, setSelectedUnit] = useState('un');
  const [selectedCategory, setSelectedCategory] = useState<ShoppingItemCategory | ''>(
    params.category ?? '',
  );
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const categoryOptions: readonly { label: string; value: ShoppingItemCategory }[] =
    selectedCategory && !categories.some((option) => option.value === selectedCategory)
      ? [{ label: categoryLabels[selectedCategory], value: selectedCategory }, ...categories]
      : categories;

  function chooseCategory(value: ShoppingItemCategory) {
    setSelectedCategory(value);
    setCategoryError(false);
    if (!name.trim()) setName(categoryLabels[value]);
    if (!quantity.trim()) setQuantity(`1 ${selectedUnit}`);
  }

  function chooseUnit(unit: string) {
    setSelectedUnit(unit);
    setQuantity((current) => (current ? `${current.trim().split(/\s+/)[0]} ${unit}` : `1 ${unit}`));
  }

  async function saveItem() {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    if (!selectedCategory) {
      setCategoryError(true);
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      const item = {
        name: name.trim(),
        quantity: quantity.trim() || null,
        category: selectedCategory,
      };

      if (isEditing) {
        await updateShoppingItem(Number(params.itemId), item);
      } else {
        await createShoppingItem(item);
      }

      router.back();
    } catch (error) {
      setSaveError(
        error instanceof ApiError
          ? error.message
          : 'Não foi possível acessar a API. Confira se ela está ativa, o endereço configurado e o acesso CORS.',
      );
    } finally {
      setSaving(false);
    }
  }

  return {
    categoryError,
    categoryOptions,
    chooseCategory,
    chooseUnit,
    isEditing,
    name,
    nameError,
    quantity,
    saveError,
    saveItem,
    saving,
    selectedCategory,
    selectedUnit,
    setName,
    setNameError,
    setQuantity,
    units,
  };
}
