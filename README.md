# Portal da Empresa

Um portal corporativo moderno desenvolvido com Next.js 15, React, TypeScript e Tailwind CSS, oferecendo funcionalidades essenciais para gestão interna da empresa.

## 🚀 Funcionalidades

### ✅ Implementadas

- **Dashboard Principal**: Visão geral com estatísticas e ações rápidas
- **Sistema de Reembolso**: Formulário completo com validação e upload de arquivos
- **Status OOO (Out of Office)**: Configuração de ausência com mensagens personalizadas
- **Sistema de Mensagens**: Chat interno entre funcionários
- **Notícias da Empresa**: Portal de notícias com filtros e categorias
- **Calendário**: Visualização de eventos com integração básica do Google Calendar
- **Header Responsivo**: Navegação adaptável para desktop e mobile

### 🔧 Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS 4**: Framework CSS utilitário
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas
- **Lucide React**: Ícones modernos
- **date-fns**: Manipulação de datas

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd portal
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse o projeto**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Estrutura do Projeto

```
portal/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── reembolso/
│   │   │   └── page.tsx          # Formulário de reembolso
│   │   ├── ooo/
│   │   │   └── page.tsx          # Configuração OOO
│   │   ├── mensagens/
│   │   │   └── page.tsx          # Sistema de mensagens
│   │   ├── noticias/
│   │   │   └── page.tsx          # Portal de notícias
│   │   └── calendario/
│   │       └── page.tsx          # Calendário de eventos
│   └── components/
│       └── Header.tsx            # Header responsivo
├── public/                       # Arquivos estáticos
└── package.json
```

## 📱 Páginas e Funcionalidades

### 🏠 Dashboard Principal (`/`)

- Visão geral das estatísticas
- Ações rápidas para funcionalidades principais
- Atividade recente
- Cards informativos

### 💰 Sistema de Reembolso (`/reembolso`)

- Formulário completo com validação
- Upload de comprovantes
- Categorização de despesas
- Validação com Zod
- Interface responsiva

### 🏖️ Status OOO (`/ooo`)

- Configuração de ausência
- Período personalizado
- Mensagem para colegas
- Contato de emergência
- Toggle de ativação/desativação

### 💬 Sistema de Mensagens (`/mensagens`)

- Chat interno entre funcionários
- Lista de contatos
- Status online/offline
- Busca de contatos
- Interface de chat moderna

### 📰 Portal de Notícias (`/noticias`)

- Lista de notícias da empresa
- Filtros por categoria
- Busca por texto
- Marcação de importantes
- Tags e categorização

### 📅 Calendário (`/calendario`)

- Visualização mensal de eventos
- Navegação entre meses
- Detalhes dos eventos
- Cores por categoria
- Integração básica com Google Calendar

## 🔧 Configuração Avançada

### Integração com Google Calendar

Para integrar completamente com o Google Calendar, você precisará:

1. **Criar um projeto no Google Cloud Console**
2. **Habilitar a Google Calendar API**
3. **Criar credenciais de serviço**
4. **Configurar as variáveis de ambiente**

```env
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Calendar
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret

# Outras configurações
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎨 Personalização

### Cores e Tema

O projeto usa Tailwind CSS. Para personalizar as cores, edite o arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
};
```

### Componentes

Todos os componentes estão em `src/components/` e podem ser facilmente modificados para atender às necessidades específicas da sua empresa.

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- AWS Amplify
- Railway
- Heroku

## 📋 Próximos Passos

### Funcionalidades Planejadas

- [ ] Sistema de autenticação
- [ ] Dashboard administrativo
- [ ] Relatórios e analytics
- [ ] Notificações push
- [ ] Integração com Slack/Teams
- [ ] Sistema de permissões
- [ ] Backup automático
- [ ] PWA (Progressive Web App)

### Melhorias Técnicas

- [ ] Testes unitários com Jest
- [ ] Testes E2E com Playwright
- [ ] Storybook para componentes
- [ ] CI/CD pipeline
- [ ] Monitoramento de performance
- [ ] SEO otimizado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para melhorar a experiência dos funcionários**
