# Smart List — front-end

Aplicativo React Native com Expo Router. Este é o repositório `MobDev-Tech/front`. A API Spring Boot fica no repositório separado `MobDev-Tech/smart-list-api`.

## Iniciar API e app

Em um terminal, entre na pasta do repositório da API:

```powershell
cd C:\Users\Matheus\Documents\oK\front
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
docker compose up --build -d
Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/health'
```

Se o `.env` da API já existe, o comando mantém seus valores. Confira as credenciais antes de iniciar. Depois de alterar código Java, execute novamente `docker compose up --build -d api` na pasta da API.

Em outro terminal, entre neste repositório:

```powershell
cd C:\Users\Matheus\Documents\oK\front-app\mobile
npm ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npx expo start
```

Abra `http://localhost:8081` no Chrome para usar a versão web. O app usa `http://localhost:8080` como endereço padrão da API no navegador.

Se quiser abrir as telas no Expo Go para uma revisão visual, pressione `s` no terminal do Expo para alternar para Expo Go. O monitoramento em segundo plano requer o APK de desenvolvimento.

Para o emulador Android, deixe a variável comentada; o padrão é `http://10.0.2.2:8080`. Para um celular na mesma rede, defina `EXPO_PUBLIC_API_URL` no `.env.local` com o IP do computador, por exemplo `http://192.168.100.39:8080`, e reinicie o Expo. O IP pode mudar. Confira o firewall do Windows se o celular não alcançar a API.

O monitoramento da saída de casa em segundo plano usa geocerca nativa. Valide esse fluxo em uma **build de desenvolvimento** (`npx expo run:android` com Android Studio configurado, ou `npx eas-cli@latest build --platform android --profile development` após entrar na conta Expo e vincular o projeto). O perfil `mobile/eas.json` gera um APK. Inicie o Metro com `npx expo start --dev-client`. O Expo Go e o Chrome servem para revisar telas e operações da lista, mas não comprovam o funcionamento da geocerca em segundo plano. O Android solicita localização em primeiro e segundo plano e permissão de notificação; a lista continua funcionando caso essas permissões sejam negadas.

## Verificações

```powershell
npm run typecheck
npm run lint
npm run format:check
```

O progresso e as pendências de validação estão em [FRONTEND-PLAN.md](FRONTEND-PLAN.md).
