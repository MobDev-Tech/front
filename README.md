# Smart List Mobile

Aplicativo mobile da Smart List, construído com Expo, React Native, TypeScript e Expo Router.

## Executar

Consulte o [guia do repositório](../README.md) para iniciar a API e o aplicativo juntos.

```powershell
npm ci
npx expo start
```

Comandos úteis:

```powershell
npm run android
npm run web
npm run lint
npm run typecheck
npx expo-doctor
```

## URL da API

Copie `.env.example` para `.env.local`. Deixe a variável comentada no Chrome e no Android Emulator; só defina a URL para um aparelho físico:

```powershell
Copy-Item .env.example .env.local
```

Valores comuns:

- Android Emulator: `http://10.0.2.2:8080`.
- Dispositivo físico: `http://IP_DA_MAQUINA:8080`.
- Web: `http://localhost:8080`.

O cliente HTTP gera e persiste um `X-Device-ID` no dispositivo usando `expo-secure-store`.

## Estrutura

- `src/app/` — rotas e navegação do Expo Router.
- `src/features/` — funcionalidades organizadas por domínio (`shopping-list`, `settings`,
  `residence`, `item-editor`, `onboarding` e `notification-preview`). Cada fluxo separa a tela,
  estado e ações quando aplicável, componentes auxiliares, ícones, constantes e estilos.
- `src/components/` — componentes visuais reutilizáveis.
- `src/constants/` — tokens de design.
- `src/lib/` — cliente HTTP, integrações nativas e persistência local.

A lista, as configurações e a residência usam a API. A geocerca e as notificações locais exigem
permissões e uma build de desenvolvimento para validação em segundo plano no Android. O perfil
`eas.json` produz um APK de desenvolvimento.
