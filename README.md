# Elite Workout PWA

Um Progressive Web App (PWA) de treinos de altíssimo padrão, com estética de luxo e inteligência artificial avançada.

## 💎 Estética e UI/UX
- **Dark Mode Nobre**: Fundo Obsidian Black e acentos em Ouro Envelhecido.
- **Glassmorphism**: Efeito de vidro fosco em componentes e modais.
- **Animações Fluidas**: Desenvolvido com Framer Motion para uma experiência premium.
- **Otimizado para iOS**: Respeita safe area, Dynamic Island e possui meta tags para modo standalone.

## 🧠 Inteligência Artificial (Gemini)
- **O Cientista**: Gera rotinas de treino baseadas nos artigos científicos mais recentes sobre hipertrofia e biomecânica.
- **O Crítico**: Analisa seu volume de treino, cargas e densidade, fornecendo um feedback técnico e direto.

## 🚀 Como Rodar o Projeto

### 1. Clonar e Instalar
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA>
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave do Gemini:
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyD-n288CnAswuQ8pASpZ5li6Fo3FP47Pac
```

### 3. Iniciar em Desenvolvimento
```bash
npm run dev
```

### 4. Produção e Deploy
Para tornar o app público e acessível de qualquer dispositivo, a melhor opção é o **Vercel**:
1. Conecte seu repositório GitHub ao [Vercel](https://vercel.com).
2. Adicione a variável `NEXT_PUBLIC_GEMINI_API_KEY` nas configurações de Environment Variables do Vercel.
3. O deploy será automático.

## 🛠 Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS v4**
- **Framer Motion**
- **Google Generative AI SDK**
- **Lucide React**
