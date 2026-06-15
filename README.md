# PhotoNutri 🥗

App de gerenciamento nutricional baseado em fotos. Tire uma foto da sua refeição e a IA analisa os alimentos, calcula calorias e nutrientes automaticamente.

## Funcionalidades

- **📸 Análise por foto**: Tire uma foto da refeição e a IA identifica os alimentos e estima os valores nutricionais
- **📊 Tabela nutricional**: Visualize todos os nutrientes consumidos no dia (proteína, carboidratos, gorduras, vitaminas, minerais)
- **📈 Relatório diário**: Veja se está em déficit ou superávit calórico, quais nutrientes estão no ideal ou deficientes
- **💡 Sugestões inteligentes**: Receba sugestões de alimentos para suprir deficiências nutricionais
- **🎯 Metas personalizáveis**: Configure suas metas diárias de calorias e macronutrientes
- **📅 Histórico por data**: Navegue entre dias para ver o histórico alimentar

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **OpenAI GPT-4o** (análise de imagem)
- **LocalStorage** (persistência de dados)

## Configuração

### Pré-requisitos

- Node.js 20+
- Chave de API da OpenAI (com acesso ao modelo GPT-4o)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/fabio-suzuki/photo-nutri.git
cd photo-nutri

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local e adicionar sua OPENAI_API_KEY

# Rodar em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `OPENAI_API_KEY` | Chave de API da OpenAI para análise de imagens |

## Como Usar

1. Abra o app no navegador
2. Selecione o tipo de refeição (Café, Almoço, Jantar ou Lanche)
3. Toque em "Registrar Refeição" e envie uma foto
4. A IA analisa a imagem e identifica os alimentos
5. Veja a tabela nutricional completa na aba "Refeições"
6. Acesse a aba "Relatório" para o diagnóstico diário com sugestões

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/analyze/    # API route para análise de imagem via OpenAI
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout raiz
│   └── page.tsx        # Página principal
├── components/
│   ├── CalorieChart.tsx      # Gráfico circular de calorias
│   ├── DailyReport.tsx       # Relatório diário completo
│   ├── GoalsModal.tsx        # Modal de configuração de metas
│   ├── MealCard.tsx          # Card de refeição individual
│   ├── MealTypeSelector.tsx  # Seletor de tipo de refeição
│   ├── NutritionTable.tsx    # Tabela nutricional detalhada
│   └── PhotoUpload.tsx       # Componente de upload de foto
├── lib/
│   ├── nutrition-utils.ts    # Cálculos nutricionais e relatório
│   └── storage.ts            # Persistência com LocalStorage
└── types/
    └── nutrition.ts          # Tipos TypeScript
```

## Licença

MIT
