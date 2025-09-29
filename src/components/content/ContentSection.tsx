import { Card } from '@/components/ui/Card';

export interface ContentSectionProps {
  title?: string;
  emoji?: string;
  variant?: 'default' | 'highlighted' | 'info' | 'warning' | 'success';
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function ContentSection({
  title,
  emoji,
  variant = 'default',
  children,
  id,
  className = ''
}: ContentSectionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlighted':
        return 'border-l-4 border-purple-500 bg-purple-50';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50';
      default:
        return 'border border-gray-200 bg-white';
    }
  };

  const variantClasses = getVariantStyles();

  return (
    <section id={id} className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h2>
      )}
      <div className={`rounded-lg p-6 ${variantClasses}`}>
        {children}
      </div>
    </section>
  );
}

export interface TLDRSectionProps {
  children: React.ReactNode;
}

export function TLDRSection({ children }: TLDRSectionProps) {
  return (
    <ContentSection variant="highlighted" className="mb-6">
      <div className="relative">
        <div className="absolute -left-2 top-0 text-2xl font-bold text-purple-600">
          💡
        </div>
        <div className="pl-8">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">TL;DR</h3>
          <div className="text-purple-800">
            {children}
          </div>
        </div>
      </div>
    </ContentSection>
  );
}

export interface QuickIndexProps {
  items: Array<{
    title: string;
    anchor: string;
    emoji?: string;
  }>;
}

export function QuickIndex({ items }: QuickIndexProps) {
  return (
    <ContentSection variant="info" title="📚 Índice Rápido">
      <nav>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.anchor}`}
                className="flex items-center text-blue-700 hover:text-blue-900 hover:underline transition-colors"
              >
                {item.emoji && <span className="mr-2">{item.emoji}</span>}
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </ContentSection>
  );
}

export interface HighlightBoxProps {
  type?: 'tip' | 'warning' | 'important' | 'note';
  title?: string;
  children: React.ReactNode;
}

export function HighlightBox({ type = 'note', title, children }: HighlightBoxProps) {
  const getTypeConfig = () => {
    switch (type) {
      case 'tip':
        return {
          emoji: '💡',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          titleColor: 'text-green-900'
        };
      case 'warning':
        return {
          emoji: '⚠️',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          titleColor: 'text-yellow-900'
        };
      case 'important':
        return {
          emoji: '🚨',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          titleColor: 'text-red-900'
        };
      default:
        return {
          emoji: '📝',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          titleColor: 'text-blue-900'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-l-4 p-4 my-4`}>
      <div className="flex items-start">
        <span className="mr-2 text-lg">{config.emoji}</span>
        <div className="flex-1">
          {title && (
            <h4 className={`${config.titleColor} font-semibold mb-2`}>
              {title}
            </h4>
          )}
          <div className={config.textColor}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}