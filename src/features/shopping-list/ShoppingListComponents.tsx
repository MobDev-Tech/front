import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '../../constants/design-tokens';
import { quickAddCategories, type QuickAddCategory } from './shoppingList.constants';
import type { GroceryItem } from './useShoppingListController';
import { CheckIcon, GearIcon, MoreIcon, UserIcon } from './ShoppingListIcons';
import { styles } from './shoppingList.styles';

export function ListHeader({
  onSettings,
  monitoringReady,
  paused,
}: {
  onSettings: () => void;
  monitoringReady: boolean;
  paused: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text style={styles.time}>09:41</Text>
        <Text style={styles.screenTitle}>Lista De Compras</Text>
        <View style={styles.monitoringRow}>
          <View
            style={[
              styles.monitoringDot,
              (!monitoringReady || paused) && { backgroundColor: colors.tertiary },
            ]}
          />
          <Text
            style={[
              styles.monitoringText,
              (!monitoringReady || paused) && { color: colors.tertiary },
            ]}
          >
            {paused
              ? 'LEMBRETES PAUSADOS'
              : monitoringReady
                ? 'MONITORAMENTO RESIDENCIAL ATIVO'
                : 'MONITORAMENTO PENDENTE'}
          </Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <Pressable
          accessibilityLabel="Abrir configurações"
          accessibilityRole="button"
          onPress={onSettings}
          style={styles.iconButton}
        >
          <GearIcon color={colors.onSurfaceVariant} />
        </Pressable>
        <View style={styles.avatar}>
          <UserIcon />
        </View>
      </View>
    </View>
  );
}

export function GroceryCard({
  completed = false,
  disabled = false,
  item,
  onMore,
  onToggle,
}: {
  completed?: boolean;
  disabled?: boolean;
  item: GroceryItem;
  onMore: () => void;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.groceryCard, completed && styles.completedCard]}>
      <Pressable
        accessibilityLabel={
          completed ? `Marcar ${item.title} como pendente` : `Marcar ${item.title} como comprado`
        }
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        disabled={disabled}
        onPress={onToggle}
        style={[styles.checkbox, completed && styles.checkboxChecked]}
      >
        {completed ? <CheckIcon /> : null}
      </Pressable>
      <View style={styles.itemCopy}>
        <Text style={[styles.itemTitle, completed && styles.completedText]}>{item.title}</Text>
        <View style={styles.itemMetaRow}>
          {item.meta ? (
            <Text style={[styles.itemMeta, completed && styles.completedMeta]}>{item.meta}</Text>
          ) : null}
          {item.meta ? (
            <Text style={[styles.metaDivider, completed && styles.completedMeta]}>•</Text>
          ) : null}
          <Text style={[styles.categoryChip, completed && styles.completedChip]}>
            {item.category}
          </Text>
        </View>
      </View>
      <Pressable
        accessibilityLabel={`Mais opções para ${item.title}`}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onMore}
        style={styles.moreButton}
      >
        <MoreIcon />
      </Pressable>
    </View>
  );
}

export function QuickAddSheet({
  category,
  error,
  name,
  onCategoryChange,
  onClose,
  onOpenFullForm,
  onNameChange,
  onQuantityChange,
  onSave,
  quantity,
  saving,
  visible,
}: {
  category: QuickAddCategory;
  error: string | null;
  name: string;
  onCategoryChange: (value: QuickAddCategory) => void;
  onClose: () => void;
  onOpenFullForm: () => void;
  onNameChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onSave: () => void;
  quantity: string;
  saving: boolean;
  visible: boolean;
}) {
  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityLabel="Fechar adicionar produto"
          onPress={onClose}
          style={styles.modalBackdrop}
        />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Adicionar Produto</Text>
            <Pressable
              accessibilityLabel="Fechar"
              accessibilityRole="button"
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <Text style={styles.fieldLabel}>Nome do item</Text>
          <TextInput
            accessibilityLabel="Nome do item"
            onChangeText={onNameChange}
            placeholder="Ex: Iogurte Grego, Ovos..."
            placeholderTextColor={colors.outline}
            style={styles.input}
            value={name}
          />
          <Text style={styles.fieldLabel}>Quantidade</Text>
          <TextInput
            accessibilityLabel="Quantidade"
            onChangeText={onQuantityChange}
            placeholder="Ex: 2 un, 500g"
            placeholderTextColor={colors.outline}
            style={styles.input}
            value={quantity}
          />
          <Text style={styles.fieldLabel}>Categoria</Text>
          <View style={styles.categoryOptions}>
            {quickAddCategories.map((option) => (
              <Pressable
                accessibilityRole="button"
                key={option}
                onPress={() => onCategoryChange(option)}
                style={[
                  styles.categoryOption,
                  option === category && styles.categoryOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    option === category && styles.categoryOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onOpenFullForm}
            style={styles.fullFormButton}
          >
            <Text style={styles.fullFormText}>Abrir formulário completo</Text>
          </Pressable>
          {error ? (
            <Text accessibilityRole="alert" style={styles.formError}>
              {error}
            </Text>
          ) : null}
          <Pressable
            accessibilityRole="button"
            disabled={!name.trim() || saving}
            onPress={onSave}
            style={[styles.saveButton, (!name.trim() || saving) && styles.saveButtonDisabled]}
          >
            <Text style={styles.saveButtonText}>{saving ? 'Salvando…' : 'Salvar na Lista'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
