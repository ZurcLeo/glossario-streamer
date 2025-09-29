# Sistema de Design - Glossário Streamer

Este documento explica como usar o novo sistema de design para modernizar e criar conteúdo consistente no Glossário Streamer.

## 🎯 Visão Geral

O sistema de design foi criado para:
- **Manter o conteúdo**: Preservar todo o excelente conteúdo existente
- **Modernizar a experiência**: Layout mais profissional e organizativo
- **Criar consistência**: Componentes reutilizáveis em toda aplicação
- **Melhorar UX**: Navegação mais intuitiva e recursos interativos

## 🎨 Componentes Básicos

### 1. Design Tokens (`src/styles/design-tokens.ts`)
- **Cores**: Sistema de cores consistente com foco em roxo/purple
- **Tipografia**: Tamanhos, pesos e alturas de linha padronizados
- **Espaçamentos**: Sistema de espaçamento baseado em múltiplos
- **Dificuldades**: Cores específicas para níveis (iniciante, intermediário, avançado)

### 2. Componentes UI Base

#### Badge (`src/components/ui/Badge.tsx`)
```tsx
<Badge variant="difficulty" difficulty="intermediario">
  Intermediário
</Badge>

<Badge variant="featured">
  ⭐ Destaque
</Badge>

<Badge variant="tag">
  #monetização
</Badge>
```

#### Card (`src/components/ui/Card.tsx`)
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <h3>Título do Card</h3>
  </CardHeader>
  <CardContent>
    Conteúdo aqui
  </CardContent>
  <CardFooter>
    Rodapé opcional
  </CardFooter>
</Card>
```

### 3. Componentes de Conteúdo

#### Seções Especiais (`src/components/content/ContentSection.tsx`)
```tsx
// TL;DR destacado
<TLDRSection>
  <p>Resumo executivo do conteúdo</p>
</TLDRSection>

// Índice navegável
<QuickIndex items={[
  { title: "Seção 1", anchor: "secao1", emoji: "🎯" },
  { title: "Seção 2", anchor: "secao2", emoji: "📊" }
]} />

// Caixas de destaque
<HighlightBox type="tip" title="Dica Importante">
  <p>Conteúdo da dica</p>
</HighlightBox>
```

#### Componentes Especializados (`src/components/content/SpecializedSections.tsx`)
```tsx
// Calculadora rápida
<QuickCalculator
  title="Calculadora Sistema 70/30"
  calculations={[...]}
/>

// Tabela de conversão
<ConversionTable
  title="Diamantes para Honey"
  columns={["Diamantes", "Honey", "Taxa"]}
  rows={[...]}
/>

// Passo a passo
<StepByStep
  title="Como implementar"
  steps={[...]}
/>

// Cases de sucesso
<SuccessCase
  title="Case da Maria"
  streamer="Maria_Games"
  initialSituation="200 seguidores"
  strategy="Sistema 70/30"
  result="2.500 seguidores"
  keySecret="Focou em streamers do mesmo nível"
/>
```

## 📋 Templates de Conteúdo

### 1. StrategyTemplate (`src/components/templates/StrategyTemplate.tsx`)
Para estratégias como Sistema 70/30, use este template que inclui:
- TL;DR automático
- Seções de matemática e conversões
- Implementação passo a passo
- Distribuição/alocação
- Cases de sucesso
- Métricas de acompanhamento
- Armadilhas comuns

### 2. ConceptTemplate (`src/components/templates/ConceptTemplate.tsx`)
Para conceitos e definições:
- Definição clara
- Importância
- Como funciona
- Aplicações práticas
- Implementação
- Dicas importantes
- Conceitos relacionados

### 3. TutorialTemplate (`src/components/templates/TutorialTemplate.tsx`)
Para tutoriais práticos:
- Objetivo e pré-requisitos
- Materiais necessários
- Passo a passo detalhado
- Resolução de problemas
- Resultados esperados
- Próximos passos

## 🎛️ Componentes Interativos

### 1. Calculator (`src/components/interactive/Calculator.tsx`)
```tsx
<Sistema7030Calculator />
// ou
<Calculator
  title="Minha Calculadora"
  calculations={[
    { id: 'input1', label: 'Diamantes', type: 'input' },
    { id: 'output1', label: 'Honey', type: 'output', formula: (inputs) => inputs.input1 * 0.45 }
  ]}
/>
```

### 2. ProgressTracker (`src/components/interactive/ProgressTracker.tsx`)
```tsx
<StrategyImplementationTracker />
// ou
<ProgressTracker
  title="Meu Checklist"
  items={[
    { id: '1', title: 'Tarefa 1', description: 'Descrição', completed: false }
  ]}
/>
```

### 3. ComparisonTable (`src/components/interactive/ComparisonTable.tsx`)
```tsx
<MonetizationStrategiesComparison />
// ou
<ComparisonTable
  title="Comparação de Opções"
  options={[...]}
  featureLabels={{...}}
/>
```

## 🏗️ Layout Modernizado

### TermLayout (`src/components/layout/TermLayout.tsx`)
O novo layout inclui:
- **Header com gradiente**: Breadcrumb, badges de metadados, título chamativo
- **Sidebar pegajosa**: Progress de leitura, tags, navegação rápida auto-gerada
- **Conteúdo principal**: Cards elevados, tipografia melhorada
- **Funcionalidades JS**: Índice automático, barra de progresso
- **Footer contextual**: Ações de compartilhamento, informações de categoria

## 📖 Como Usar - Exemplo Prático

### Modernizando um Termo Existente

1. **Identifique o tipo de conteúdo**:
   - Estratégia? Use `StrategyTemplate`
   - Conceito? Use `ConceptTemplate`
   - Tutorial? Use `TutorialTemplate`

2. **Estruture os dados**:
```tsx
const strategyData = {
  strategy: {
    name: "Minha Estratégia",
    tldr: "Resumo executivo",
    whatIs: "Explicação completa",
    whyWorks: ["Razão 1", "Razão 2"]
  },
  // ... outros dados estruturados
};
```

3. **Use o template**:
```tsx
export function MinhaEstrategiaModerna() {
  return (
    <div>
      <StrategyTemplate {...strategyData} />

      {/* Adicione componentes interativos */}
      <MinhaCalculadora />
      <MeuProgressTracker />
    </div>
  );
}
```

4. **Integre no layout principal**:
```tsx
// Em sua página
<TermLayout term={term} category={category} allTerms={allTerms}>
  <MinhaEstrategiaModerna />
</TermLayout>
```

## 🚀 Benefícios da Modernização

### Para o Usuário:
- **Navegação mais fácil**: Índice automático, progress de leitura
- **Experiência visual melhor**: Design consistente, hierarquia clara
- **Interatividade**: Calculadoras, checklists, comparações
- **Responsive**: Funciona perfeitamente em mobile

### Para o Desenvolvimento:
- **Consistência**: Componentes reutilizáveis
- **Manutenibilidade**: Sistema de design centralizado
- **Escalabilidade**: Templates para diferentes tipos de conteúdo
- **Produtividade**: Menos código repetitivo

### Para o Conteúdo:
- **Estrutura clara**: Templates guiam organização
- **Elementos visuais**: Destacam informações importantes
- **Interatividade**: Engaja mais o usuário
- **Métricas**: Acompanhamento de implementação

## 🎯 Próximos Passos

1. **Atualizar termos existentes**: Migrar usando templates apropriados
2. **Criar novos conteúdos**: Usar sistema desde o início
3. **Personalizar componentes**: Adaptar para necessidades específicas
4. **Expandir interatividade**: Adicionar mais calculadoras e ferramentas

Este sistema mantém todo o excelente conteúdo existente enquanto eleva a experiência do usuário a um nível profissional e moderno.