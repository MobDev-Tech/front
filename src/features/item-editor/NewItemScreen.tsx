import { router } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants/design-tokens';
import { BackIcon, CategoryIcon, SaveIcon, UserIcon } from './ItemEditorIcons';
import { styles } from './itemEditor.styles';
import { useItemEditorController } from './useItemEditorController';

export default function NewItemScreen() {
  const {
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
  } = useItemEditorController();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Voltar"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <BackIcon />
          </Pressable>
          <Text style={styles.headerTitle}>{isEditing ? 'Editar Item' : 'Detalhes Do Item'}</Text>
          <View style={styles.avatar}>
            <UserIcon />
          </View>
        </View>

        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={styles.contextItems}
        >
          <View style={styles.contextRow}>
            <View style={styles.contextCheck}>
              <Text style={styles.contextCheckText}>✓</Text>
            </View>
            <View style={styles.contextCopy}>
              <Text style={styles.contextDone}>Azeite Extra Virgem 500ml</Text>
              <Text style={styles.contextMeta}>Despensa • 1 un</Text>
            </View>
            <Text style={styles.contextState}>Concluído</Text>
          </View>
          <View style={styles.contextRow}>
            <View style={styles.contextRadio} />
            <View style={styles.contextCopy}>
              <Text style={styles.contextName}>Café em Grãos Seleção Especial</Text>
              <Text style={styles.contextLocation}>Próximo ao Hortifruti (120m)</Text>
            </View>
            <Text style={styles.contextMeta}>2 pct</Text>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.modeBanner}>
            <View style={styles.modeDot} />
            <Text style={styles.modeText}>Modo Compra: Notificar ao aproximar de Supermercado</Text>
            <Text style={styles.navigationIcon}>➤</Text>
          </View>
          <View style={styles.handle} />
          <View style={styles.sheetHeading}>
            <View style={styles.headingIcon}>
              <Text style={styles.headingIconText}>☷</Text>
            </View>
            <View style={styles.headingCopy}>
              <Text style={styles.sheetTitle}>
                {isEditing ? 'Editar Item da Lista' : 'Adicionar Item à Lista'}
              </Text>
              <Text style={styles.sheetSubtitle}>Lembrete inteligente com geolocalização</Text>
            </View>
            <Pressable
              accessibilityLabel="Fechar formulário"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <View style={styles.labelGroup}>
                <Text style={styles.labelIcon}>▣</Text>
                <Text style={styles.label}>Nome do produto</Text>
              </View>
              {nameError ? <Text style={styles.error}>Obrigatório</Text> : null}
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                accessibilityLabel="Nome do produto"
                onChangeText={(value) => {
                  setName(value);
                  setNameError(false);
                }}
                placeholder="Ex: Arroz integral, Detergente..."
                placeholderTextColor={colors.outline}
                returnKeyType="next"
                style={styles.input}
                value={name}
              />
              {name ? (
                <Pressable
                  accessibilityLabel="Limpar nome do item"
                  onPress={() => setName('')}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearText}>×</Text>
                </Pressable>
              ) : null}
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <View style={styles.labelGroup}>
                <Text style={styles.labelIcon}>⌖</Text>
                <Text style={styles.label}>Quantidade</Text>
              </View>
              <Text style={styles.optional}>Opcional</Text>
            </View>
            <TextInput
              accessibilityLabel="Quantidade"
              onChangeText={setQuantity}
              placeholder="Ex: 2 unidades, 1 kg, 500g"
              placeholderTextColor={colors.outline}
              returnKeyType="done"
              style={styles.inputBox}
              value={quantity}
            />
            <View style={styles.unitsRow}>
              <Text style={styles.unitsLabel}>Unidades:</Text>
              {units.map((unit) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: unit === selectedUnit }}
                  key={unit}
                  onPress={() => chooseUnit(unit)}
                  style={[styles.unitChip, unit === selectedUnit && styles.unitChipSelected]}
                >
                  <Text style={[styles.unitText, unit === selectedUnit && styles.unitTextSelected]}>
                    {unit}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.categoriesSection}>
            <View style={styles.categoryHeading}>
              <Text style={styles.bolt}>ϟ</Text>
              <Text style={styles.label}>Adicionar tag ao item</Text>
              {categoryError ? <Text style={styles.error}>Obrigatória</Text> : null}
            </View>
            <View style={styles.categoryGrid}>
              {categoryOptions.map(({ label, value }) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedCategory === value }}
                  key={value}
                  onPress={() => chooseCategory(value)}
                  style={[
                    styles.categoryChip,
                    selectedCategory === value && styles.categoryChipSelected,
                  ]}
                >
                  <CategoryIcon category={label} />
                  <Text style={styles.categoryText}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {saveError ? (
            <Text accessibilityRole="alert" style={styles.saveError}>
              {saveError}
            </Text>
          ) : null}
          <Pressable
            accessibilityRole="button"
            disabled={saving}
            onPress={() => {
              void saveItem();
            }}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
              saving && styles.savingButton,
            ]}
          >
            <SaveIcon />
            <Text style={styles.saveText}>
              {saving ? 'Salvando…' : isEditing ? 'Salvar Alterações' : 'Salvar Item'}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
