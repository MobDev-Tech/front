import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { router } from 'expo-router';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants/design-tokens';
import { useShoppingListController } from './useShoppingListController';
import { GroceryCard, ListHeader, QuickAddSheet } from './ShoppingListComponents';
import { ChevronIcon, PlusIcon, SnoozeIcon } from './ShoppingListIcons';
import { styles } from './shoppingList.styles';

export default function ShoppingListScreen() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
  const {
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
    setSheetOpen,
    sheetOpen,
    toggleItem,
    togglePause,
  } = useShoppingListController();
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ListHeader
          monitoringReady={monitoringReady}
          paused={paused}
          onSettings={() => router.push('/(tabs)/settings')}
        />

        <View style={styles.summaryRow}>
          <Text style={styles.pendingCount}>
            {itemsLoading
              ? 'Carregando lista…'
              : itemsError
                ? 'Lista indisponível'
                : pending.length + ' itens pendentes'}
          </Text>
          <Pressable
            accessibilityLabel={paused ? 'Reativar lembretes' : 'Pausar lembretes'}
            accessibilityRole="button"
            disabled={isWriting}
            onPress={() => {
              void togglePause();
            }}
            style={[styles.pauseButton, paused && styles.pauseButtonActive]}
          >
            <SnoozeIcon color={paused ? colors.tertiary : colors.onSurfaceVariant} />
            <Text style={[styles.pauseText, paused && styles.pauseTextActive]}>
              {paused ? 'Pausado' : 'Pausar'}
            </Text>
          </Pressable>
        </View>

        {actionError ? (
          <View accessibilityRole="alert" style={styles.actionErrorCard}>
            <Text style={styles.actionErrorText}>{actionError}</Text>
          </View>
        ) : null}

        <View style={styles.pendingList}>
          {itemsLoading ? (
            <View accessibilityRole="progressbar" style={styles.feedbackCard}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.feedbackText}>Carregando seus itens…</Text>
            </View>
          ) : itemsError ? (
            <View accessibilityRole="alert" style={styles.feedbackCard}>
              <Text style={styles.feedbackTitle}>Não foi possível carregar a lista</Text>
              <Text style={styles.feedbackText}>{itemsError}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void loadItems()}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Tentar novamente</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {pending.map((item) => (
                <GroceryCard
                  disabled={isWriting}
                  key={item.id}
                  item={item}
                  onMore={() => setOptionsItem(item)}
                  onToggle={() => {
                    void toggleItem(item);
                  }}
                />
              ))}
              {pending.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>
                    {completed.length === 0 ? 'Sua lista está vazia' : 'Tudo comprado'}
                  </Text>
                  <Text style={styles.emptyText}>
                    {completed.length === 0
                      ? 'Adicione o primeiro produto para começar sua lista.'
                      : 'Adicione um produto quando sua próxima lista começar.'}
                  </Text>
                </View>
              ) : null}
            </>
          )}
        </View>

        {!itemsLoading && !itemsError ? (
          <>
            <View style={styles.completedHeader}>
              <Pressable
                accessibilityLabel={
                  completedExpanded
                    ? 'Recolher comprados recentemente'
                    : 'Expandir comprados recentemente'
                }
                accessibilityRole="button"
                onPress={() => setCompletedExpanded((current) => !current)}
                style={styles.completedTitleButton}
              >
                <ChevronIcon expanded={completedExpanded} />
                <Text style={styles.completedTitle}>
                  Comprados recentemente ({completed.length})
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={isWriting || completed.length === 0}
                onPress={() => {
                  void clearCompletedItems();
                }}
                style={[
                  styles.clearButton,
                  (isWriting || completed.length === 0) && styles.clearButtonDisabled,
                ]}
              >
                <Text style={styles.clearText}>Limpar</Text>
              </Pressable>
            </View>

            {completedExpanded ? (
              <View style={styles.completedList}>
                {completed.map((item) => (
                  <GroceryCard
                    completed
                    disabled={isWriting}
                    key={item.id}
                    item={item}
                    onMore={() => setOptionsItem(item)}
                    onToggle={() => {
                      void toggleItem(item);
                    }}
                  />
                ))}
                {completed.length === 0 ? (
                  <Text style={styles.noCompleted}>Nenhum item comprado recentemente.</Text>
                ) : null}
              </View>
            ) : null}
          </>
        ) : null}
      </ScrollView>

      <Pressable
        accessibilityLabel="Adicionar produto à lista"
        accessibilityRole="button"
        disabled={itemsLoading || isWriting}
        onPress={() => setSheetOpen(true)}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <PlusIcon />
      </Pressable>

      <QuickAddSheet
        category={category}
        error={quickAddError}
        name={name}
        onCategoryChange={setCategory}
        onClose={() => setSheetOpen(false)}
        onOpenFullForm={() => {
          setSheetOpen(false);
          router.push('/item/new');
        }}
        onNameChange={setName}
        onQuantityChange={setQuantity}
        onSave={() => {
          void saveQuickItem();
        }}
        quantity={quantity}
        saving={isWriting}
        visible={sheetOpen}
      />

      <Modal
        animationType="slide"
        onRequestClose={() => {
          setOptionsItem(null);
          setConfirmDelete(false);
        }}
        transparent
        visible={optionsItem !== null}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityLabel="Fechar opções do item"
            onPress={() => {
              setOptionsItem(null);
              setConfirmDelete(false);
            }}
            style={styles.modalBackdrop}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            {confirmDelete && optionsItem ? (
              <>
                <Text style={styles.sheetTitle}>Excluir item?</Text>
                <Text style={styles.deleteDescription}>
                  {optionsItem.title} será removido da lista. Essa ação não pode ser desfeita.
                </Text>
                {actionError ? (
                  <Text accessibilityRole="alert" style={styles.modalActionError}>
                    {actionError}
                  </Text>
                ) : null}
                <Pressable
                  accessibilityRole="button"
                  disabled={isWriting}
                  onPress={() => {
                    void deleteSelectedItem();
                  }}
                  style={[styles.deleteConfirmButton, isWriting && styles.saveButtonDisabled]}
                >
                  <Text style={styles.deleteConfirmText}>
                    {isWriting ? 'Excluindo…' : 'Excluir item'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setConfirmDelete(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.sheetTitle}>{optionsItem?.title ?? 'Opções do item'}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    if (!optionsItem) return;
                    const itemToEdit = optionsItem;
                    setOptionsItem(null);
                    router.push({
                      pathname: '/item/new',
                      params: {
                        itemId: String(itemToEdit.id),
                        name: itemToEdit.title,
                        quantity: itemToEdit.meta,
                        category: itemToEdit.apiCategory,
                      },
                    });
                  }}
                  style={styles.optionAction}
                >
                  <Text style={styles.optionActionText}>Editar item</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setActionError(null);
                    setConfirmDelete(true);
                  }}
                  style={styles.deleteAction}
                >
                  <Text style={styles.deleteActionText}>Excluir item</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setOptionsItem(null)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
