'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export interface CalculatorProps {
  title: string;
  description?: string;
  calculations: Array<{
    id: string;
    label: string;
    type: 'input' | 'output' | 'formula';
    placeholder?: string;
    formula?: (inputs: Record<string, number>) => number;
    format?: (value: number) => string;
    suffix?: string;
    prefix?: string;
  }>;
}

export function Calculator({ title, description, calculations }: CalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, number>>({});

  const handleInputChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [id]: numValue }));
  };

  const calculateValue = (calc: typeof calculations[0]) => {
    if (calc.type === 'output' && calc.formula) {
      const result = calc.formula(inputs);
      return calc.format ? calc.format(result) : result.toString();
    }
    return '';
  };

  return (
    <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
      <CardHeader>
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
          <span className="mr-2">🧮</span>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-blue-700">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calculations.map((calc) => (
            <div key={calc.id} className="flex items-center space-x-4">
              <label className="flex-1 text-sm font-medium text-gray-700">
                {calc.label}
              </label>

              {calc.type === 'input' && (
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder={calc.placeholder}
                    onChange={(e) => handleInputChange(calc.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {calc.type === 'output' && (
                <div className="flex-1 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="font-semibold text-green-800">
                    {calc.prefix}{calculateValue(calc)}{calc.suffix}
                  </span>
                </div>
              )}

              {calc.type === 'formula' && (
                <div className="flex-1 text-sm text-gray-600 italic">
                  {calc.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Calculadora específica para Sistema 70/30
export function Sistema7030Calculator() {
  return (
    <Calculator
      title="Calculadora Sistema 70/30"
      description="Digite a quantidade de diamantes para ver a divisão otimizada"
      calculations={[
        {
          id: 'diamantes',
          label: 'Diamantes totais',
          type: 'input',
          placeholder: '10000'
        },
        {
          id: 'reinvestimento',
          label: 'Para reinvestimento (70%)',
          type: 'output',
          formula: (inputs) => inputs.diamantes * 0.7,
          format: (value) => Math.round(value).toLocaleString(),
          suffix: ' 💎'
        },
        {
          id: 'honey',
          label: 'Honey equivalente',
          type: 'output',
          formula: (inputs) => (inputs.diamantes * 0.7) * 0.45,
          format: (value) => Math.round(value).toLocaleString(),
          suffix: ' 🍯'
        },
        {
          id: 'receita',
          label: 'Para receita (30%)',
          type: 'output',
          formula: (inputs) => inputs.diamantes * 0.3,
          format: (value) => Math.round(value).toLocaleString(),
          suffix: ' 💎'
        },
        {
          id: 'cash',
          label: 'Valor em cash',
          type: 'output',
          formula: (inputs) => {
            const diamonds = inputs.diamantes * 0.3;
            if (diamonds >= 20000) {
              return (diamonds / 20000) * 50;
            }
            return 0;
          },
          format: (value) => value > 0 ? `$${value.toFixed(2)}` : 'Acumular mais',
          prefix: ''
        }
      ]}
    />
  );
}