import { TLDRSection, QuickIndex, HighlightBox } from '@/components/content/ContentSection';
import { StepByStep, MetricsTracker } from '@/components/content/SpecializedSections';

// Template para tutoriais práticos
export interface TutorialTemplateProps {
  tutorial: {
    name: string;
    goal: string;
    tldr: string;
    difficulty: 'iniciante' | 'intermediario' | 'avancado';
    timeRequired: string;
  };

  prerequisites?: {
    required: string[];
    recommended: string[];
  };

  materials?: {
    tools: string[];
    resources: string[];
  };

  steps: Array<{
    number: number;
    title: string;
    description: string;
    emoji?: string;
    tips?: string[];
    warnings?: string[];
    screenshot?: string;
  }>;

  troubleshooting?: Array<{
    problem: string;
    solution: string;
    prevention: string;
  }>;

  results?: {
    expected: string;
    metrics?: Array<{
      name: string;
      target: string;
      measurement: string;
      icon?: string;
    }>;
  };

  nextSteps?: {
    title: string;
    recommendations: Array<{
      action: string;
      description: string;
      link?: string;
    }>;
  };
}

export function TutorialTemplate({
  tutorial,
  prerequisites,
  materials,
  steps,
  troubleshooting,
  results,
  nextSteps
}: TutorialTemplateProps) {
  const getDifficultyColor = () => {
    switch (tutorial.difficulty) {
      case 'iniciante':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediario':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avancado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const quickIndexItems = [
    { title: "Objetivo", anchor: "objetivo", emoji: "🎯" },
    ...(prerequisites ? [{ title: "Pré-requisitos", anchor: "prerequisitos", emoji: "📋" }] : []),
    ...(materials ? [{ title: "Materiais necessários", anchor: "materiais", emoji: "🛠️" }] : []),
    { title: "Passo a passo", anchor: "passos", emoji: "👣" },
    ...(troubleshooting ? [{ title: "Resolução de problemas", anchor: "problemas", emoji: "🔧" }] : []),
    ...(results ? [{ title: "Resultados esperados", anchor: "resultados", emoji: "📊" }] : []),
    ...(nextSteps ? [{ title: "Próximos passos", anchor: "proximos-passos", emoji: "➡️" }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* Header com informações do tutorial */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor()}`}>
            {tutorial.difficulty}
          </span>
          <span className="text-sm text-gray-600">
            ⏱️ Tempo necessário: {tutorial.timeRequired}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{tutorial.name}</h1>
        <p className="text-lg text-gray-700">{tutorial.goal}</p>
      </div>

      {/* TL;DR */}
      <TLDRSection>
        <p>{tutorial.tldr}</p>
      </TLDRSection>

      {/* Índice Rápido */}
      <QuickIndex items={quickIndexItems} />

      {/* Objetivo */}
      <section id="objetivo" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎯</span>
          Objetivo
        </h2>
        <HighlightBox type="note" title="O que você vai alcançar">
          <p>{tutorial.goal}</p>
        </HighlightBox>
      </section>

      {/* Pré-requisitos */}
      {prerequisites && (
        <section id="prerequisitos" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📋</span>
            Pré-requisitos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Obrigatórios
              </h3>
              <ul className="space-y-2">
                {prerequisites.required.map((req, index) => (
                  <li key={index} className="text-red-700 flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Recomendados
              </h3>
              <ul className="space-y-2">
                {prerequisites.recommended.map((rec, index) => (
                  <li key={index} className="text-blue-700 flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Materiais necessários */}
      {materials && (
        <section id="materiais" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🛠️</span>
            Materiais necessários
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Ferramentas</h3>
              <ul className="space-y-2">
                {materials.tools.map((tool, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="mr-2 mt-1">🔧</span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Recursos</h3>
              <ul className="space-y-2">
                {materials.resources.map((resource, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="mr-2 mt-1">📚</span>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Passo a passo */}
      <section id="passos" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">👣</span>
          Passo a passo
        </h2>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {step.emoji && <span className="mr-2">{step.emoji}</span>}
                    {step.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{step.description}</p>

                  {step.tips && step.tips.length > 0 && (
                    <HighlightBox type="tip" title="💡 Dicas">
                      <ul className="list-disc list-inside space-y-1">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </HighlightBox>
                  )}

                  {step.warnings && step.warnings.length > 0 && (
                    <HighlightBox type="warning" title="⚠️ Atenção">
                      <ul className="list-disc list-inside space-y-1">
                        {step.warnings.map((warning, warningIndex) => (
                          <li key={warningIndex}>{warning}</li>
                        ))}
                      </ul>
                    </HighlightBox>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resolução de problemas */}
      {troubleshooting && (
        <section id="problemas" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🔧</span>
            Resolução de problemas
          </h2>

          <div className="space-y-4">
            {troubleshooting.map((issue, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                  <span className="mr-2">❓</span>
                  {issue.problem}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">💡 Solução</h4>
                    <p className="text-yellow-700">{issue.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">🛡️ Prevenção</h4>
                    <p className="text-yellow-700">{issue.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resultados esperados */}
      {results && (
        <section id="resultados" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📊</span>
            Resultados esperados
          </h2>

          <HighlightBox type="tip" title="✅ O que você deve ver">
            <p>{results.expected}</p>
          </HighlightBox>

          {results.metrics && (
            <MetricsTracker title="Métricas de sucesso" metrics={results.metrics} />
          )}
        </section>
      )}

      {/* Próximos passos */}
      {nextSteps && (
        <section id="proximos-passos" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">➡️</span>
            {nextSteps.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextSteps.recommendations.map((rec, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  {rec.link ? (
                    <a href={rec.link} className="hover:underline">
                      {rec.action}
                    </a>
                  ) : (
                    rec.action
                  )}
                </h3>
                <p className="text-green-700 text-sm">{rec.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}