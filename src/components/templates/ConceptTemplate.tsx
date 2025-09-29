import { TLDRSection, QuickIndex, HighlightBox } from '@/components/content/ContentSection';
import { StepByStep } from '@/components/content/SpecializedSections';

// Template para conceitos e definições
export interface ConceptTemplateProps {
  concept: {
    name: string;
    definition: string;
    tldr: string;
    importance: string;
  };

  howItWorks?: {
    explanation: string;
    examples: Array<{
      title: string;
      description: string;
      result: string;
    }>;
  };

  applications: {
    title: string;
    useCases: Array<{
      scenario: string;
      application: string;
      benefit: string;
    }>;
  };

  implementation?: {
    steps: Array<{
      number: number;
      title: string;
      description: string;
      emoji?: string;
    }>;
  };

  tips?: Array<{
    title: string;
    content: string;
    type: 'tip' | 'warning' | 'important';
  }>;

  relatedConcepts?: Array<{
    name: string;
    relationship: string;
    link?: string;
  }>;
}

export function ConceptTemplate({
  concept,
  howItWorks,
  applications,
  implementation,
  tips,
  relatedConcepts
}: ConceptTemplateProps) {
  const quickIndexItems = [
    { title: "Definição", anchor: "definicao", emoji: "📖" },
    { title: "Por que é importante", anchor: "importancia", emoji: "⭐" },
    ...(howItWorks ? [{ title: "Como funciona", anchor: "como-funciona", emoji: "⚙️" }] : []),
    { title: "Aplicações", anchor: "aplicacoes", emoji: "🎯" },
    ...(implementation ? [{ title: "Como implementar", anchor: "implementacao", emoji: "📋" }] : []),
    ...(tips ? [{ title: "Dicas importantes", anchor: "dicas", emoji: "💡" }] : []),
    ...(relatedConcepts ? [{ title: "Conceitos relacionados", anchor: "relacionados", emoji: "🔗" }] : []),
  ];

  return (
    <div className="space-y-8">
      {/* TL;DR */}
      <TLDRSection>
        <p>{concept.tldr}</p>
      </TLDRSection>

      {/* Índice Rápido */}
      <QuickIndex items={quickIndexItems} />

      {/* Definição */}
      <section id="definicao" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">📖</span>
          Definição
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed">{concept.definition}</p>
        </div>
      </section>

      {/* Por que é importante */}
      <section id="importancia" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">⭐</span>
          Por que é importante
        </h2>
        <HighlightBox type="important">
          <p>{concept.importance}</p>
        </HighlightBox>
      </section>

      {/* Como funciona */}
      {howItWorks && (
        <section id="como-funciona" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">⚙️</span>
            Como funciona
          </h2>

          <div className="prose prose-lg max-w-none">
            <p>{howItWorks.explanation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.examples.map((example, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">{example.title}</h3>
                <p className="text-blue-800 mb-3">{example.description}</p>
                <div className="text-sm font-medium text-blue-700">
                  <span className="font-semibold">Resultado:</span> {example.result}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Aplicações */}
      <section id="aplicacoes" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎯</span>
          {applications.title}
        </h2>

        <div className="space-y-4">
          {applications.useCases.map((useCase, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cenário</h4>
                  <p className="text-gray-700">{useCase.scenario}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Aplicação</h4>
                  <p className="text-gray-700">{useCase.application}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Benefício</h4>
                  <p className="text-green-700 font-medium">{useCase.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como implementar */}
      {implementation && (
        <section id="implementacao" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📋</span>
            Como implementar
          </h2>
          <StepByStep title="Passos para implementação" steps={implementation.steps} />
        </section>
      )}

      {/* Dicas importantes */}
      {tips && (
        <section id="dicas" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">💡</span>
            Dicas importantes
          </h2>

          <div className="space-y-4">
            {tips.map((tip, index) => (
              <HighlightBox key={index} type={tip.type} title={tip.title}>
                <p>{tip.content}</p>
              </HighlightBox>
            ))}
          </div>
        </section>
      )}

      {/* Conceitos relacionados */}
      {relatedConcepts && (
        <section id="relacionados" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🔗</span>
            Conceitos relacionados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedConcepts.map((related, index) => (
              <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  {related.link ? (
                    <a href={related.link} className="hover:underline">
                      {related.name}
                    </a>
                  ) : (
                    related.name
                  )}
                </h3>
                <p className="text-purple-700 text-sm">{related.relationship}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}