'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface ComparisonOption {
  id: string;
  name: string;
  description?: string;
  features: Record<string, string | number | boolean>;
  isRecommended?: boolean;
  pros?: string[];
  cons?: string[];
}

export interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  options: ComparisonOption[];
  featureLabels: Record<string, string>;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function ComparisonTable({
  title,
  subtitle,
  options,
  featureLabels,
  onSelectionChange
}: ComparisonTableProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const formatFeatureValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? '✅' : '❌';
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const getFeatureColor = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? 'text-green-600' : 'text-red-600';
    }
    return 'text-gray-900';
  };

  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">⚖️</span>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                  Características
                </th>
                {options.map((option) => (
                  <th key={option.id} className="px-4 py-3 text-center min-w-[160px]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-semibold text-gray-900">{option.name}</span>
                        {option.isRecommended && (
                          <Badge variant="featured" size="sm">
                            Recomendado
                          </Badge>
                        )}
                      </div>

                      {option.description && (
                        <p className="text-xs text-gray-600">{option.description}</p>
                      )}

                      <button
                        onClick={() => handleOptionToggle(option.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedOptions.includes(option.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {selectedOptions.includes(option.id) ? 'Selecionado' : 'Selecionar'}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Object.entries(featureLabels).map(([featureKey, featureLabel]) => (
                <tr key={featureKey} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    {featureLabel}
                  </td>
                  {options.map((option) => (
                    <td key={option.id} className="px-4 py-3 text-center">
                      <span className={`text-sm font-medium ${getFeatureColor(option.features[featureKey])}`}>
                        {formatFeatureValue(option.features[featureKey])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pros and Cons for selected options */}
        {selectedOptions.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Comparação Detalhada</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {options
                .filter(option => selectedOptions.includes(option.id))
                .map(option => (
                  <div key={option.id} className="space-y-4">
                    <h5 className="font-medium text-gray-900">{option.name}</h5>

                    {option.pros && option.pros.length > 0 && (
                      <div>
                        <h6 className="text-sm font-medium text-green-800 mb-2">✅ Vantagens</h6>
                        <ul className="text-sm text-green-700 space-y-1">
                          {option.pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {option.cons && option.cons.length > 0 && (
                      <div>
                        <h6 className="text-sm font-medium text-red-800 mb-2">❌ Desvantagens</h6>
                        <ul className="text-sm text-red-700 space-y-1">
                          {option.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Tabela de comparação para estratégias de monetização
export function MonetizationStrategiesComparison() {
  const strategies: ComparisonOption[] = [
    {
      id: 'sistema-7030',
      name: 'Sistema 70/30',
      description: 'Reinvestimento inteligente com foco em crescimento',
      isRecommended: true,
      features: {
        reinvestimento: 70,
        receita: 30,
        crescimento: true,
        sustentabilidade: true,
        complexidade: 'Média',
        tempoRetorno: '2-3 meses',
        risco: 'Baixo'
      },
      pros: [
        'Crescimento acelerado',
        'Networking sólido',
        'Receita garantida',
        'ROI sustentável'
      ],
      cons: [
        'Receita inicial menor',
        'Requer disciplina',
        'Demanda tempo de análise'
      ]
    },
    {
      id: 'foco-receita',
      name: 'Foco em Receita',
      description: 'Conversão máxima para dinheiro',
      features: {
        reinvestimento: 0,
        receita: 100,
        crescimento: false,
        sustentabilidade: false,
        complexidade: 'Baixa',
        tempoRetorno: 'Imediato',
        risco: 'Alto'
      },
      pros: [
        'Receita imediata máxima',
        'Simplicidade de execução',
        'Sem investimento necessário'
      ],
      cons: [
        'Crescimento limitado',
        'Falta de networking',
        'Insustentável a longo prazo'
      ]
    },
    {
      id: 'reinvestimento-total',
      name: 'Reinvestimento Total',
      description: 'Foco exclusivo em crescimento',
      features: {
        reinvestimento: 100,
        receita: 0,
        crescimento: true,
        sustentabilidade: false,
        complexidade: 'Alta',
        tempoRetorno: '4-6 meses',
        risco: 'Médio'
      },
      pros: [
        'Crescimento acelerado máximo',
        'Networking extenso',
        'Potencial de longo prazo'
      ],
      cons: [
        'Sem receita imediata',
        'Risco de desmotivação',
        'Dependente de reciprocidade'
      ]
    }
  ];

  const featureLabels = {
    reinvestimento: 'Reinvestimento (%)',
    receita: 'Receita Imediata (%)',
    crescimento: 'Potencial de Crescimento',
    sustentabilidade: 'Sustentabilidade',
    complexidade: 'Complexidade',
    tempoRetorno: 'Tempo para Retorno',
    risco: 'Nível de Risco'
  };

  return (
    <ComparisonTable
      title="Comparação de Estratégias de Monetização"
      subtitle="Compare diferentes abordagens para escolher a melhor para seu perfil"
      options={strategies}
      featureLabels={featureLabels}
    />
  );
}