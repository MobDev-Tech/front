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

- `src/app/` — rotas do Expo Router.
- `src/components/` — componentes visuais reutilizáveis.
- `src/constants/` — tokens de design.
- `src/lib/` — cliente HTTP e persistência local.

A lista, as configurações, a residência e a pausa de lembretes usam a API. A geocerca e as notificações locais exigem permissões e uma build de desenvolvimento para validação em segundo plano no Android. O perfil `eas.json` produz um APK de desenvolvimento.
