import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { router } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants/design-tokens';
import { copy } from './onboarding.constants';
import { GeofenceHero, NearMeIcon, PrivacyCard, StepCard } from './OnboardingComponents';
import { styles } from './onboarding.styles';
import { completeOnboarding } from '../../lib/storage';

export default function OnboardingScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  async function skipSetup() {
    await completeOnboarding();
    router.replace('/(tabs)/list');
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GeofenceHero />

        <View style={styles.introduction}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.description}>{copy.description}</Text>
        </View>

        <View style={styles.steps}>
          {copy.steps.map((step) => (
            <StepCard key={step.label} {...step} />
          ))}
        </View>

        <PrivacyCard />

        <View style={styles.actions}>
          <Pressable
            accessibilityLabel="Configurar residência e permissões"
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/residence', params: { from: 'onboarding' } })}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <NearMeIcon />
            <Text style={styles.primaryButtonText}>Configurar Residência e Permissões</Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Começar a usar a lista agora, configurar depois"
            accessibilityRole="button"
            onPress={skipSetup}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.secondaryButtonText}>
              Começar a usar a lista agora (configurar depois)
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
