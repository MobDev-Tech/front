import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

import { ApiError } from '../../lib/api';
import { configureGeofence } from '../../lib/geofence-monitor';
import { applySnooze, cancelSnooze, getSnooze } from '../../lib/notification-api';
import { getResidence } from '../../lib/residence';
import { getDiagnostic, getSettings, syncDevicePermissions } from '../../lib/settings';
import {
  clearCompletedShoppingItems,
  createShoppingItem,
  deleteShoppingItem,
  getShoppingItems,
  toggleShoppingItemCompletion,
  type ShoppingItemResponse,
} from '../../lib/shopping-items';
import { categoryApiValues, categoryLabels, type QuickAddCategory } from './shoppingList.constants';

export type GroceryItem = {
  id: number;
  title: string;
  meta: string;
  category: string;
  apiCategory: ShoppingItemResponse['category'];
};

function mapShoppingItem(item: ShoppingItemResponse): GroceryItem {
  return {
    id: item.id,
    title: item.name,
    meta: item.quantity ?? '',
    category: categoryLabels[item.category],
    apiCategory: item.category,
  };
}

function getShoppingListErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message;
  return 'Não foi possível acessar a API. Confira se ela está ativa, o endereço configurado e o acesso CORS.';
}

export function useShoppingListController() {
  const [pending, setPending] = useState<GroceryItem[]>([]);
  const [completed, setCompleted] = useState<GroceryItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [completedExpanded, setCompletedExpanded] = useState(true);
  const [paused, setPaused] = useState(false);
  const [monitoringReady, setMonitoringReady] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [optionsItem, setOptionsItem] = useState<GroceryItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [quickAddError, setQuickAddError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<QuickAddCategory>('Mercearia');
  const latestListRequest = useRef(0);

  const loadItems = useCallback(async (silent = false) => {
    const requestId = ++latestListRequest.current;
    if (!silent) setItemsLoading(true);
    setItemsError(null);

    try {
      const response = await getShoppingItems();
      if (requestId !== latestListRequest.current) return;
      setPending(response.pendingItems.map(mapShoppingItem));
      setCompleted(response.completedItems.map(mapShoppingItem));
    } catch (error) {
      if (requestId !== latestListRequest.current) return;
      setItemsError(getShoppingListErrorMessage(error));
    } finally {
      if (!silent && requestId === latestListRequest.current) setItemsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadItems();
      void (async () => {
        try {
          const settings = await syncDevicePermissions(await getSettings());
          const [diagnostic, snooze, residence] = await Promise.all([
            getDiagnostic(),
            getSnooze(),
            getResidence(),
          ]);
          const running = await configureGeofence(residence, settings);
          setMonitoringReady(diagnostic.isSystemReady && running);
          setPaused(snooze.active);
        } catch {
          setMonitoringReady(false);
        }
      })();
    }, [loadItems]),
  );

  async function togglePause() {
    if (isWriting) return;
    setIsWriting(true);
    setActionError(null);
    try {
      const result = paused ? await cancelSnooze() : await applySnooze('INDEFINITE');
      setPaused(result.active);
    } catch (error) {
      setActionError(getShoppingListErrorMessage(error));
    } finally {
      setIsWriting(false);
    }
  }

  async function toggleItem(item: GroceryItem) {
    if (isWriting) return;
    setIsWriting(true);
    setActionError(null);
    try {
      await toggleShoppingItemCompletion(item.id);
      await loadItems(true);
    } catch (error) {
      setActionError(getShoppingListErrorMessage(error));
    } finally {
      setIsWriting(false);
    }
  }

  async function clearCompletedItems() {
    if (isWriting || completed.length === 0) return;
    setIsWriting(true);
    setActionError(null);
    try {
      await clearCompletedShoppingItems();
      await loadItems(true);
    } catch (error) {
      setActionError(getShoppingListErrorMessage(error));
    } finally {
      setIsWriting(false);
    }
  }

  async function deleteSelectedItem() {
    if (!optionsItem || isWriting) return;
    setIsWriting(true);
    setActionError(null);
    try {
      await deleteShoppingItem(optionsItem.id);
      setOptionsItem(null);
      setConfirmDelete(false);
      await loadItems(true);
    } catch (error) {
      setActionError(getShoppingListErrorMessage(error));
    } finally {
      setIsWriting(false);
    }
  }

  async function saveQuickItem() {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setIsWriting(true);
    setQuickAddError(null);
    try {
      await createShoppingItem({
        name: trimmedName,
        quantity: quantity.trim() || null,
        category: categoryApiValues[category],
      });
      setName('');
      setQuantity('');
      setCategory('Mercearia');
      setSheetOpen(false);
      await loadItems(true);
    } catch (error) {
      setQuickAddError(getShoppingListErrorMessage(error));
    } finally {
      setIsWriting(false);
    }
  }

  return {
    actionError,
    category,
    clearCompletedItems,
    completed,
    completedExpanded,
    confirmDelete,
    deleteSelectedItem,
    isWriting,
    itemsError,
    itemsLoading,
    loadItems,
    monitoringReady,
    name,
    optionsItem,
    paused,
    pending,
    quantity,
    quickAddError,
    saveQuickItem,
    setActionError,
    setCategory,
    setCompletedExpanded,
    setConfirmDelete,
    setName,
    setOptionsItem,
    setQuantity,
    setQuickAddError,
    setSheetOpen,
    sheetOpen,
    toggleItem,
    togglePause,
  };
}
