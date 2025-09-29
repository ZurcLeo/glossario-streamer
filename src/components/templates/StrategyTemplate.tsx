import { TLDRSection, QuickIndex, HighlightBox } from '@/components/content/ContentSection';
import {
  QuickCalculator,
  ConversionTable,
  StepByStep,
  SuccessCase,
  AllocationChart,
  MetricsTracker
} from '@/components/content/SpecializedSections';

// Template para estratégias (como Sistema 70/30)
export interface StrategyTemplateProps {
  // Dados básicos da estratégia
  strategy: {
    name: string;
    subtitle?: string;
    tldr: string;
    whatIs: string;
    whyWorks: string[];
  };

  // Matemática e conversões
  math?: {
    conversionRates: Array<{
      from: string;
      to: string;
      rate: string;
      examples: string[];
    }>;
    calculations?: Array<{
      label: string;
      formula: string;
      result: string;
    }>;
  };

  // Implementação
  implementation: {
    steps: Array<{
      number: number;
      title: string;
      description: string;
      emoji?: string;
    }>;
    timing?: {
      title: string;
      recommendations: string[];
    };
  };

  // Distribuição/Alocação
  allocation?: {
    title: string;
    items: Array<{
      label: string;
      percentage: number;
      description: string;
      color: string;
    }>;
  };

  // Cases de sucesso
  successCases?: Array<{
    title: string;
    streamer: string;
    initialSituation: string;
    strategy: string;
    result: string;
    keySecret?: string;
  }>;

  // Métricas
  metrics?: {
    title: string;
    items: Array<{
      name: string;
      target: string;
      measurement: string;
      icon?: string;
    }>;
  };

  // Armadilhas comuns
  pitfalls?: Array<{
    error: string;
    whyHurts: string;
    doThis: string;
  }>;
}

export function StrategyTemplate({
  strategy,
  math,
  implementation,
  allocation,
  successCases,
  metrics,
  pitfalls
}: StrategyTemplateProps) {
  const quickIndexItems = [
    { title: "O que é", anchor: "o-que-e", emoji: "🎯" },
    { title: "A Matemática", anchor: "a-matematica", emoji: "🧮" },
    { title: "Por que funciona", anchor: "por-que-funciona", emoji: "🌟" },
    { title: "Como implementar", anchor: "como-implementar", emoji: "📋" },
    ...(allocation ? [{ title: "Distribuição", anchor: "distribuicao", emoji: "📊" }] : []),
    ...(successCases ? [{ title: "Cases de Sucesso", anchor: "cases", emoji: "🏆" }] : []),
    ...(metrics ? [{ title: "Métricas", anchor: "metricas", emoji: "📈" }] : []),
    ...(pitfalls ? [{ title: "Armadilhas", anchor: "armadilhas", emoji: "⚠️" }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* TL;DR */}
      <TLDRSection>
        <p>{strategy.tldr}</p>
      </TLDRSection>

      {/* Índice Rápido */}
      <QuickIndex items={quickIndexItems} />

      {/* O que é */}
      <section id="o-que-e" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎯</span>
          O que é
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>{strategy.whatIs}</p>
        </div>
      </section>

      {/* A Matemática */}
      {math && (
        <section id="a-matematica" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🧮</span>
            A Matemática
          </h2>

          {/* Taxas de conversão */}
          {math.conversionRates.map((conversion, index) => (
            <ConversionTable
              key={index}
              title={`${conversion.from} para ${conversion.to}`}
              columns={[conversion.from, conversion.to, 'Taxa']}
              rows={conversion.examples.map(example => [
                example.split(' = ')[0],
                example.split(' = ')[1],
                conversion.rate
              ])}
              highlightColumn={2}
            />
          ))}

          {/* Calculadora rápida */}
          {math.calculations && (
            <QuickCalculator calculations={math.calculations} />
          )}
        </section>
      )}

      {/* Por que funciona */}
      <section id="por-que-funciona" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🌟</span>
          Por que funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategy.whyWorks.map((reason, index) => (
            <HighlightBox key={index} type="tip">
              <p>{reason}</p>
            </HighlightBox>
          ))}
        </div>
      </section>

      {/* Como implementar */}
      <section id="como-implementar" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">📋</span>
          Como implementar
        </h2>
        <StepByStep title="Passos para implementação" steps={implementation.steps} />

        {implementation.timing && (
          <HighlightBox type="important" title={implementation.timing.title}>
            <ul className="list-disc list-inside space-y-1">
              {implementation.timing.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </HighlightBox>
        )}
      </section>

      {/* Distribuição */}
      {allocation && (
        <section id="distribuicao" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📊</span>
            Distribuição Inteligente
          </h2>
          <AllocationChart title={allocation.title} allocations={allocation.items} />
        </section>
      )}

      {/* Cases de Sucesso */}
      {successCases && (
        <section id="cases" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🏆</span>
            Cases de Sucesso
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {successCases.map((case_, index) => (
              <SuccessCase key={index} {...case_} />
            ))}
          </div>
        </section>
      )}

      {/* Métricas */}
      {metrics && (
        <section id="metricas" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📈</span>
            Métricas de Sucesso
          </h2>
          <MetricsTracker title={metrics.title} metrics={metrics.items} />
        </section>
      )}

      {/* Armadilhas Comuns */}
      {pitfalls && (
        <section id="armadilhas" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">⚠️</span>
            Armadilhas Comuns
          </h2>

          <ConversionTable
            title="O que NUNCA fazer"
            columns={['❌ Erro', '💭 Por que prejudica', '✅ Faça isso']}
            rows={pitfalls.map(pitfall => [
              pitfall.error,
              pitfall.whyHurts,
              pitfall.doThis
            ])}
          />

          <HighlightBox type="warning" title="🚨 Red Flag">
            <p>Se você não está vendo resultados após implementar a estratégia, revise os passos e verifique se está evitando as armadilhas comuns.</p>
          </HighlightBox>
        </section>
      )}
    </div>
  );
}