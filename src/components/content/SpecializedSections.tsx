import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HighlightBox } from './ContentSection';

// Componente para Calculadora Rápida
export interface QuickCalculatorProps {
  title?: string;
  calculations: Array<{
    label: string;
    formula: string;
    result: string;
  }>;
}

export function QuickCalculator({ title = "🧮 Calculadora Rápida", calculations }: QuickCalculatorProps) {
  return (
    <Card variant="elevated" className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <span className="mr-2">🧮</span>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calculations.map((calc, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
              <div className="font-medium text-gray-900 mb-2">{calc.label}</div>
              <div className="text-sm text-gray-600 mb-2">{calc.formula}</div>
              <div className="text-lg font-bold text-green-700">{calc.result}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para tabelas de conversão
export interface ConversionTableProps {
  title: string;
  columns: string[];
  rows: string[][];
  highlightColumn?: number;
}

export function ConversionTable({ title, columns, rows, highlightColumn }: ConversionTableProps) {
  return (
    <Card variant="outlined" className="overflow-hidden">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-3 text-left text-sm font-semibold text-gray-900 ${
                      highlightColumn === index ? 'bg-purple-100' : ''
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-sm ${
                        highlightColumn === cellIndex
                          ? 'font-semibold text-purple-700 bg-purple-50'
                          : 'text-gray-900'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para estratégias passo a passo
export interface StepByStepProps {
  title: string;
  steps: Array<{
    number: number;
    title: string;
    description: string;
    emoji?: string;
  }>;
}

export function StepByStep({ title, steps }: StepByStepProps) {
  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📋</span>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
                  {step.emoji && <span className="mr-2">{step.emoji}</span>}
                  {step.title}
                </h4>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para cases de sucesso
export interface SuccessCaseProps {
  title: string;
  streamer: string;
  initialSituation: string;
  strategy: string;
  result: string;
  keySecret?: string;
}

export function SuccessCase({
  title,
  streamer,
  initialSituation,
  strategy,
  result,
  keySecret
}: SuccessCaseProps) {
  return (
    <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
          <span className="mr-2">🌟</span>
          {title}
        </h3>
        <div className="text-sm font-medium text-blue-700">
          Streamer: {streamer}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Situação Inicial:</h4>
            <p className="text-gray-600">{initialSituation}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Estratégia:</h4>
            <p className="text-gray-600">{strategy}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Resultado:</h4>
            <p className="text-green-700 font-semibold">{result}</p>
          </div>
          {keySecret && (
            <HighlightBox type="tip" title="🔑 Segredo do Sucesso">
              <p>{keySecret}</p>
            </HighlightBox>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para distribuição/alocação
export interface AllocationChartProps {
  title: string;
  allocations: Array<{
    label: string;
    percentage: number;
    description: string;
    color: string;
  }>;
}

export function AllocationChart({ title, allocations }: AllocationChartProps) {
  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📊</span>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allocations.map((allocation, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{allocation.label}</span>
                <Badge variant="default" className={`${allocation.color} text-white`}>
                  {allocation.percentage}%
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${allocation.color}`}
                  style={{ width: `${allocation.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{allocation.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para métricas de sucesso
export interface MetricsTrackerProps {
  title: string;
  metrics: Array<{
    name: string;
    target: string;
    measurement: string;
    icon?: string;
  }>;
}

export function MetricsTracker({ title, metrics }: MetricsTrackerProps) {
  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📈</span>
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                {metric.icon && <span className="mr-2">{metric.icon}</span>}
                <h4 className="font-semibold text-gray-900">{metric.name}</h4>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Meta:</span> {metric.target}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Como medir:</span> {metric.measurement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}