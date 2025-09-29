import { StrategyTemplate } from '@/components/templates/StrategyTemplate';
import { Sistema7030Calculator } from '@/components/interactive/Calculator';
import { StrategyImplementationTracker } from '@/components/interactive/ProgressTracker';
import { MonetizationStrategiesComparison } from '@/components/interactive/ComparisonTable';

// Exemplo de como usar o novo sistema para modernizar o termo Sistema 70/30
export function Sistema7030Modern() {
  const strategyData = {
    strategy: {
      name: "Sistema 70/30",
      subtitle: "Estratégia de Reinvestimento Inteligente para Crescimento Sustentável",
      tldr: "Divida seus diamantes estrategicamente: 70% para reinvestir em crescimento através de presentes (honey), 30% para receita pessoal (cash).",
      whatIs: "O Sistema 70/30 é uma estratégia de reinvestimento inteligente que divide seus diamantes ganhos de forma otimizada para crescimento sustentável. 70% dos diamantes são convertidos em Honey para presentear outros streamers estrategicamente, enquanto 30% são convertidos em Cash para receita pessoal imediata. É um sistema que transforma monetização em combustível para crescimento, garantindo receita presente e investimento no futuro.",
      whyWorks: [
        "Honey tem melhor conversão para visibilidade que cash",
        "Presentes geram networking orgânico com outros streamers",
        "Cria reciprocidade - outros retribuem presentes",
        "Garante receita real consistente (30%)",
        "ROI superior em médio prazo comparado ao foco só em receita"
      ]
    },

    math: {
      conversionRates: [
        {
          from: "Diamantes",
          to: "Cash",
          rate: "0,0025 por diamante",
          examples: [
            "20.000 💎 = $50",
            "80.000 💎 = $200",
            "200.000 💎 = $500"
          ]
        },
        {
          from: "Diamantes",
          to: "Honey",
          rate: "0,45 honey por diamante",
          examples: [
            "200 💎 = 🍯 90",
            "2.000 💎 = 🍯 900",
            "10.000 💎 = 🍯 4.500",
            "40.000 💎 = 🍯 18.000"
          ]
        }
      ],
      calculations: [
        {
          label: "Exemplo com 10.000 diamantes",
          formula: "70% Reinvestimento (7.000 💎) → 3.150 🍯",
          result: "30% Receita (3.000 💎) → Acumular para saque"
        }
      ]
    },

    implementation: {
      steps: [
        {
          number: 1,
          title: "Planejamento Semanal",
          description: "Calcule diamantes ganhos na semana anterior, defina 70% para honey e 30% para cash. Identifique streamers-alvo para presentear.",
          emoji: "📅"
        },
        {
          number: 2,
          title: "Seleção de Targets",
          description: "Escolha streamers ativos, com audiência compatível, reciprocidade histórica e potencial de crescimento mútuo.",
          emoji: "🎯"
        },
        {
          number: 3,
          title: "Timing Estratégico",
          description: "Presenteie nos primeiros 15 minutos da live, em momentos de celebração, eventos especiais ou após interações genuínas.",
          emoji: "⏰"
        }
      ],
      timing: {
        title: "⚠️ Momentos ideais para presentear",
        recommendations: [
          "Primeiros 15 minutos da live (máxima audiência)",
          "Momentos de celebração (novos seguidores, conquistas)",
          "Eventos especiais (aniversários, marcos)",
          "Após interações genuínas no chat"
        ]
      }
    },

    allocation: {
      title: "Estratégia de Alocação do Honey",
      items: [
        {
          label: "Streamers do Seu Nível",
          percentage: 40,
          description: "Crescimento mútuo, 20-50 honey cada, reciprocidade + raids",
          color: "bg-blue-500"
        },
        {
          label: "Streamers Menores",
          percentage: 35,
          description: "Mentoria e lealdade, 10-30 honey cada, gratidão + networking sólido",
          color: "bg-green-500"
        },
        {
          label: "Streamers Maiores",
          percentage: 25,
          description: "Visibilidade e aprendizado, 50-100 honey cada, exposição + mentoria",
          color: "bg-purple-500"
        }
      ]
    },

    successCases: [
      {
        title: "Case 1: A Revolução da Maria",
        streamer: "Maria_Games",
        initialSituation: "200 seguidores, 2.000 💎/mês",
        strategy: "Sistema 70/30 rigoroso por 4 meses",
        result: "2.500 seguidores, 15.000 💎/mês",
        keySecret: "Focou 70% dos presentes em streamers do mesmo nível. Criou uma 'família' de 12 streamers que se ajudam mutuamente."
      },
      {
        title: "Case 2: O Investidor Inteligente",
        streamer: "TechBro_Stream",
        initialSituation: "1.000 seguidores, 8.000 💎/mês",
        strategy: "70/30 + networking premium",
        result: "8.000 seguidores, 45.000 💎/mês, $200/mês em cash",
        keySecret: "Usou 25% do honey em 'mega presentes' (100+ honey) para streamers estratégicos. Construiu relacionamentos com influencers do nicho."
      }
    ],

    metrics: {
      title: "Tracker Mensal do Sistema 70/30",
      items: [
        {
          name: "Diamantes investidos",
          target: "70% do total",
          measurement: "Honey convertido vs. total ganho",
          icon: "💎"
        },
        {
          name: "Taxa reciprocidade",
          target: "40%+",
          measurement: "% streamers que retribuíram",
          icon: "🤝"
        },
        {
          name: "Novos seguidores",
          target: "100+",
          measurement: "Seguidores vindos de networking",
          icon: "📈"
        },
        {
          name: "Cash acumulado",
          target: "30% do total",
          measurement: "Valor real sacado/acumulado",
          icon: "💰"
        },
        {
          name: "ROI mensal",
          target: "3x+",
          measurement: "Crescimento vs. investimento",
          icon: "🎯"
        }
      ]
    },

    pitfalls: [
      {
        error: "Só presentear streamers grandes",
        whyHurts: "Baixo ROI, pouca reciprocidade",
        doThis: "Foque no seu nível"
      },
      {
        error: "Presentear e sumir",
        whyHurts: "Parece spam, não gera networking",
        doThis: "Interaja genuinamente"
      },
      {
        error: "Não acompanhar ROI",
        whyHurts: "Desperdício de investimento",
        doThis: "Meça resultados"
      },
      {
        error: "Converter tudo em cash",
        whyHurts: "Zero crescimento",
        doThis: "Mantenha o 70/30"
      },
      {
        error: "Presentes aleatórios",
        whyHurts: "Sem estratégia = sem resultados",
        doThis: "Tenha critérios claros"
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Template principal */}
      <StrategyTemplate {...strategyData} />

      {/* Calculadora interativa */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          🧮 Calculadora Interativa
        </h2>
        <Sistema7030Calculator />
      </section>

      {/* Tracker de progresso */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          📋 Acompanhe sua Implementação
        </h2>
        <StrategyImplementationTracker />
      </section>

      {/* Comparação de estratégias */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          ⚖️ Compare com Outras Estratégias
        </h2>
        <MonetizationStrategiesComparison />
      </section>
    </div>
  );
}