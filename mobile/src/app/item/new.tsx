import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, radii } from '../../constants/design-tokens';

const units = ['un', 'kg', 'g', 'pct', 'L', 'cx'];
const categories = ['Padaria', 'Farmácia', 'Mercado', 'Limpeza', 'Papelaria', 'Hortifruti'];

export default function NewItemScreen() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('un');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nameError, setNameError] = useState(false);

  function chooseCategory(value: string) {
    setSelectedCategory(value);
    if (!name.trim()) setName(value);
    if (!quantity.trim()) setQuantity(`1 ${selectedUnit}`);
  }

  function chooseUnit(unit: string) {
    setSelectedUnit(unit);
    setQuantity((current) => current ? `${current.trim().split(/\s+/)[0]} ${unit}` : `1 ${unit}`);
  }

  function saveItem() {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    router.back();
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Voltar" accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <BackIcon />
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes Do Item</Text>
          <View style={styles.avatar}><UserIcon /></View>
        </View>

        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.contextItems}>
          <View style={styles.contextRow}>
            <View style={styles.contextCheck}><Text style={styles.contextCheckText}>✓</Text></View>
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
            <View style={styles.headingIcon}><Text style={styles.headingIconText}>☷</Text></View>
            <View style={styles.headingCopy}>
              <Text style={styles.sheetTitle}>Adicionar Item à Lista</Text>
              <Text style={styles.sheetSubtitle}>Lembrete inteligente com geolocalização</Text>
            </View>
            <Pressable accessibilityLabel="Fechar formulário" accessibilityRole="button" onPress={() => router.back()} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <View style={styles.labelGroup}><Text style={styles.labelIcon}>▣</Text><Text style={styles.label}>Nome do produto</Text></View>
              {nameError ? <Text style={styles.error}>Obrigatório</Text> : null}
            </View>
            <View style={styles.inputWrap}>
              <TextInput accessibilityLabel="Nome do produto" onChangeText={(value) => { setName(value); setNameError(false); }} placeholder="Ex: Arroz integral, Detergente..." placeholderTextColor={colors.outline} returnKeyType="next" style={styles.input} value={name} />
              {name ? <Pressable accessibilityLabel="Limpar nome do item" onPress={() => setName('')} style={styles.clearButton}><Text style={styles.clearText}>×</Text></Pressable> : null}
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <View style={styles.labelGroup}><Text style={styles.labelIcon}>⌖</Text><Text style={styles.label}>Quantidade</Text></View>
              <Text style={styles.optional}>Opcional</Text>
            </View>
            <TextInput accessibilityLabel="Quantidade" onChangeText={setQuantity} placeholder="Ex: 2 unidades, 1 kg, 500g" placeholderTextColor={colors.outline} returnKeyType="done" style={styles.inputBox} value={quantity} />
            <View style={styles.unitsRow}>
              <Text style={styles.unitsLabel}>Unidades:</Text>
              {units.map((unit) => <Pressable accessibilityRole="button" accessibilityState={{ selected: unit === selectedUnit }} key={unit} onPress={() => chooseUnit(unit)} style={[styles.unitChip, unit === selectedUnit && styles.unitChipSelected]}><Text style={[styles.unitText, unit === selectedUnit && styles.unitTextSelected]}>{unit}</Text></Pressable>)}
            </View>
          </View>

          <View style={styles.categoriesSection}>
            <View style={styles.categoryHeading}><Text style={styles.bolt}>ϟ</Text><Text style={styles.label}>Adicionar tag ao item</Text></View>
            <View style={styles.categoryGrid}>
              {categories.map((label) => <Pressable accessibilityRole="button" accessibilityState={{ selected: selectedCategory === label }} key={label} onPress={() => chooseCategory(label)} style={[styles.categoryChip, selectedCategory === label && styles.categoryChipSelected]}><CategoryIcon category={label} /><Text style={styles.categoryText}>{label}</Text></Pressable>)}
            </View>
          </View>

          <Pressable accessibilityRole="button" onPress={saveItem} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
            <SaveIcon />
            <Text style={styles.saveText}>Salvar Item</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.cancelButton}><Text style={styles.cancelText}>Cancelar</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SaveIcon() {
  return <Svg height="18" viewBox="0 0 24 24" width="18"><Path d="M5 4h12l3 3v13H4V4h1Zm2 0v6h9V4M8 20v-7h8v7" fill="none" stroke={colors.onPrimary} strokeLinejoin="round" strokeWidth="1.8" /><Circle cx="10" cy="16" fill={colors.onPrimary} r=".7" /></Svg>;
}

function UserIcon() {
  return <Svg height="18" viewBox="0 0 24 24" width="18"><Circle cx="12" cy="8" fill="none" r="3" stroke={colors.onPrimary} strokeWidth="1.8" /><Path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7" fill="none" stroke={colors.onPrimary} strokeLinecap="round" strokeWidth="1.8" /></Svg>;
}

function BackIcon() {
  return <Svg height="22" viewBox="0 0 24 24" width="22"><Path d="m15 18-6-6 6-6M9 12h11" fill="none" stroke={colors.onSurface} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></Svg>;
}

function CategoryIcon({ category }: { category: string }) {
  const common = { fill: 'none', stroke: colors.primary, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.7 };

  switch (category) {
    case 'Padaria':
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="M4 10h16v9H4zM4 10c0-3 2-5 4-5 1.5 0 2.5 1 4 1s2.5-1 4-1c2 0 4 2 4 5M8 13v3m4-3v3m4-3v3" {...common} /></Svg>;
    case 'Farmácia':
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="M12 5v14M5 12h14" {...common} strokeWidth={2.5} /></Svg>;
    case 'Mercado':
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="M4 9h16l-1.5 11h-13L4 9Zm3 0 2-5m8 5-2-5M8 12v5m4-5v5m4-5v5" {...common} /></Svg>;
    case 'Limpeza':
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="M8 4h8v4l2 2v10H6V10l2-2V4Zm0 4h8m-4 3v5m-2-2 2 2 2-2" {...common} /></Svg>;
    case 'Papelaria':
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="m5 17 10-10 4 4L9 21H5v-4Zm8-8 4 4M4 5h7M4 9h4" {...common} /></Svg>;
    default:
      return <Svg height="14" viewBox="0 0 24 24" width="14"><Path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" {...common} /><Path d="M12 7c-2 2-2 5 0 7m0-4c1-1 2-1 3-1" {...common} /></Svg>;
  }
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 },
  content: { paddingBottom: 20, paddingHorizontal: 12 },
  header: { alignItems: 'center', flexDirection: 'row', height: 54, marginBottom: 7 },
  backButton: { alignItems: 'center', height: 44, justifyContent: 'center', marginLeft: -8, width: 40 },
  headerTitle: { color: colors.onSurface, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: -0.2 },
  avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  contextItems: { gap: 8, marginBottom: 12, opacity: 0.42 },
  contextRow: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: radii.md, flexDirection: 'row', gap: 8, minHeight: 48, paddingHorizontal: 10, paddingVertical: 7 },
  contextCheck: { alignItems: 'center', backgroundColor: colors.surfaceContainerHigh, borderRadius: 7, height: 22, justifyContent: 'center', width: 22 },
  contextCheckText: { color: colors.primary, fontSize: 15 },
  contextRadio: { borderColor: colors.outline, borderRadius: 8, borderWidth: 1, height: 16, width: 16 },
  contextCopy: { flex: 1, minWidth: 0 },
  contextDone: { color: colors.onSurface, fontFamily: 'Inter_400Regular', fontSize: 11, textDecorationLine: 'line-through' },
  contextName: { color: colors.onSurface, fontFamily: 'Inter_400Regular', fontSize: 11 },
  contextMeta: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 9 },
  contextState: { color: colors.outline, fontFamily: 'Inter_400Regular', fontSize: 9 },
  contextLocation: { color: colors.primary, fontFamily: 'Inter_400Regular', fontSize: 9 },
  sheet: { backgroundColor: colors.surfaceContainerLowest, borderRadius: 18, elevation: 4, paddingHorizontal: 12, paddingTop: 9, paddingBottom: 14, shadowColor: colors.onSurface, shadowOffset: { height: 3, width: 0 }, shadowOpacity: 0.14, shadowRadius: 9 },
  modeBanner: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: 10, flexDirection: 'row', gap: 8, minHeight: 36, paddingHorizontal: 9 },
  modeDot: { backgroundColor: colors.secondary, borderRadius: 5, height: 8, width: 8 },
  modeText: { color: colors.onSurfaceVariant, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 9, lineHeight: 12 },
  navigationIcon: { color: colors.secondary, fontSize: 14 },
  handle: { alignSelf: 'center', backgroundColor: colors.outlineVariant, borderRadius: 3, height: 4, marginTop: 7, width: 36 },
  sheetHeading: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 12, marginTop: 5 },
  headingIcon: { alignItems: 'center', backgroundColor: '#7FFC97', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  headingIconText: { color: '#002109', fontSize: 20 },
  headingCopy: { flex: 1 },
  sheetTitle: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 15, letterSpacing: -0.2 },
  sheetSubtitle: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 2 },
  closeButton: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: 18, height: 34, justifyContent: 'center', width: 34 },
  closeText: { color: colors.onSurfaceVariant, fontSize: 24, lineHeight: 28 },
  field: { marginBottom: 11 },
  labelRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  labelGroup: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  labelIcon: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  label: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  error: { color: colors.error, fontFamily: 'Inter_600SemiBold', fontSize: 9 },
  optional: { color: colors.outline, fontFamily: 'Inter_400Regular', fontSize: 9 },
  inputWrap: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: 10, flexDirection: 'row', minHeight: 41, paddingHorizontal: 10 },
  input: { color: colors.onSurface, flex: 1, fontFamily: 'Inter_400Regular', fontSize: 12, minHeight: 41, paddingVertical: 0 },
  inputBox: { backgroundColor: colors.surfaceContainerLow, borderRadius: 10, color: colors.onSurface, fontFamily: 'Inter_400Regular', fontSize: 12, minHeight: 41, paddingHorizontal: 10, paddingVertical: 0 },
  clearButton: { alignItems: 'center', backgroundColor: colors.surfaceContainerHigh, borderRadius: 12, height: 24, justifyContent: 'center', width: 24 },
  clearText: { color: colors.onSurfaceVariant, fontSize: 18, lineHeight: 21 },
  unitsRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 6 },
  unitsLabel: { color: colors.outline, fontFamily: 'Inter_400Regular', fontSize: 9, marginRight: 1 },
  unitChip: { alignItems: 'center', backgroundColor: colors.surfaceContainer, borderRadius: 12, justifyContent: 'center', minWidth: 27, paddingHorizontal: 8, paddingVertical: 4 },
  unitChipSelected: { backgroundColor: colors.primary },
  unitText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_600SemiBold', fontSize: 9 },
  unitTextSelected: { color: colors.onPrimary },
  categoriesSection: { marginBottom: 12 },
  categoryHeading: { alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 7 },
  bolt: { color: colors.tertiary, fontSize: 16, fontWeight: '700' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  categoryChip: { alignItems: 'center', backgroundColor: colors.surfaceContainerLow, borderRadius: 9, flexDirection: 'row', gap: 5, minHeight: 30, paddingHorizontal: 8 },
  categoryChipSelected: { backgroundColor: '#7FFC97' },
  categoryText: { color: colors.onSurface, fontFamily: 'Inter_600SemiBold', fontSize: 9 },
  saveButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 9, elevation: 2, flexDirection: 'row', gap: 7, height: 42, justifyContent: 'center', shadowColor: colors.onSurface, shadowOffset: { height: 1, width: 0 }, shadowOpacity: 0.18, shadowRadius: 3 },
  saveText: { color: colors.onPrimary, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  cancelButton: { alignItems: 'center', justifyContent: 'center', minHeight: 34, marginTop: 2 },
  cancelText: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 10 },
});
