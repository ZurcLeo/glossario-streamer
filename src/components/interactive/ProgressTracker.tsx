'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface ProgressItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ProgressTrackerProps {
  title: string;
  subtitle?: string;
  items: ProgressItem[];
  onItemToggle?: (id: string, completed: boolean) => void;
}

export function ProgressTracker({ title, subtitle, items, onItemToggle }: ProgressTrackerProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      initial[item.id] = item.completed;
    });
    setCheckedItems(initial);
  }, [items]);

  const handleToggle = (id: string) => {
    const newCompleted = !checkedItems[id];
    setCheckedItems(prev => ({ ...prev, [id]: newCompleted }));
    onItemToggle?.(id, newCompleted);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = (completedCount / items.length) * 100;

  return (
    <Card variant="outlined">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">📋</span>
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            {completedCount}/{items.length}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems[item.id] || false}
                onChange={() => handleToggle(item.id)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={item.id} className="flex-1 cursor-pointer">
                <div className={`${checkedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>

        {completedCount === items.length && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">🎉</span>
              <span className="text-green-800 font-medium">
                Parabéns! Você completou todos os itens!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Tracker específico para implementação de estratégias
export function StrategyImplementationTracker() {
  const strategyItems: ProgressItem[] = [
    {
      id: 'analysis',
      title: 'Análise semanal dos diamantes',
      description: 'Calcular diamantes ganhos na semana anterior e definir divisão 70/30',
      completed: false
    },
    {
      id: 'targets',
      title: 'Identificar streamers-alvo',
      description: 'Selecionar streamers compatíveis com seu nicho e audiência',
      completed: false
    },
    {
      id: 'conversion',
      title: 'Converter diamantes em honey',
      description: 'Converter 70% dos diamantes em honey para reinvestimento',
      completed: false
    },
    {
      id: 'gifts',
      title: 'Distribuir presentes estratégicos',
      description: 'Presentear streamers seguindo a estratégia de timing otimizado',
      completed: false
    },
    {
      id: 'tracking',
      title: 'Acompanhar reciprocidade',
      description: 'Monitorar quais streamers retribuíram presentes e interações',
      completed: false
    },
    {
      id: 'metrics',
      title: 'Medir resultados',
      description: 'Avaliar crescimento de seguidores e ROI do investimento',
      completed: false
    }
  ];

  return (
    <ProgressTracker
      title="Checklist de Implementação"
      subtitle="Acompanhe seu progresso na implementação da estratégia"
      items={strategyItems}
    />
  );
}