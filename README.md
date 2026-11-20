# 🛒 Smart List

Desenvolvido como parte de uma atividade extensionista de Desenvolvimento Mobile, o Smart List
ajuda a organizar compras e lembrar dos itens pendentes. Com a localização autorizada, envia uma
notificação ao detectar a saída da residência configurada, ajudando pessoas a se lembrarem das
compras antes de sair de casa e tornando a rotina mais prática.

## 🖼️ Imagens do aplicativo

_As capturas de tela serão adicionadas aqui._

## ✨ Funcionalidades

- 📝 Adicionar e editar produtos, quantidades e categorias.
- ✅ Marcar itens como comprados e organizar a lista por status.
- 🏠 Configurar a residência usando a localização do aparelho.
- 📍 Usar geofence para detectar a saída do perímetro residencial.
- 🔔 Receber e pausar lembretes de compras.
- ⚙️ Consultar preferências e permissões do aplicativo.

## 🧰 Tecnologias

- **Aplicativo:** React Native, Expo SDK 58 e TypeScript.
- **Navegação:** Expo Router.
- **Recursos nativos:** Expo Location, Task Manager, Notifications e SecureStore.
- **Backend:** API REST feita com [Spring Boot](https://spring.io/projects/spring-boot), no repositório separado [MobDev-Tech/smart-list-api](https://github.com/MobDev-Tech/smart-list-api).
- **Banco de dados:** [Supabase](https://supabase.com).
- **Deploy da API:** [Render](https://smart-list-api.onrender.com).

## 🚀 Executar

Requer Node.js e npm. Na pasta do projeto, instale as dependências e inicie a versão web:

```powershell
npm ci
npm run web
```

Para abrir no Android, use `npm run android`. O comando inicia o Expo; é necessário ter um emulador
aberto ou conectar um aparelho.

### Configurar a API

A API está em um repositório separado e precisa estar acessível para carregar e salvar dados:

- 💻 Código-fonte: [MobDev-Tech/smart-list-api](https://github.com/MobDev-Tech/smart-list-api)
- 🌐 API publicada no Render: [smart-list-api.onrender.com](https://smart-list-api.onrender.com/)
- 📚 Documentação Swagger: [swagger-ui.html](https://smart-list-api.onrender.com/swagger-ui.html)

Por padrão, o app usa `http://localhost:8080` na web e `http://10.0.2.2:8080` no emulador Android.
Para usar a API publicada ou outra URL, crie `.env.local` a partir do exemplo:

```powershell
Copy-Item .env.example .env.local
```

Defina a URL base em `.env.local` (sem acrescentar `/api/v1`):

```dotenv
EXPO_PUBLIC_API_URL=https://smart-list-api.onrender.com
```

O cliente acrescenta o caminho da API e envia um identificador do dispositivo. Não coloque senhas
ou tokens nessa variável.

### 📲 APK Android

O [APK de desenvolvimento no Expo EAS](https://expo.dev/accounts/devpedrogo/projects/smart-list/builds/9b4f2a33-f7f7-42dd-a53d-7d7fa7b984c8)
está disponível para download na página do build.

> Recursos nativos como geofence em segundo plano dependem de permissões e de uma build Android; a
> versão web serve para visualizar e testar as telas, mas não substitui esse teste.

## 🧱 Estrutura

- `src/app/` — rotas do Expo Router.
- `src/features/` — telas e lógica separadas por funcionalidade.
- `src/components/` — componentes visuais compartilhados.
- `src/lib/` — API, localização, notificações e armazenamento local.
- `src/constants/` — tokens e constantes do app.


