// Importar apenas o que precisamos para evitar problemas de build
const difficultyStyles = {
  iniciante: 'bg-green-100 text-green-800',
  intermediario: 'bg-yellow-100 text-yellow-800',
  avancado: 'bg-red-100 text-red-800',
} as const;

export interface BadgeProps {
  variant?: 'default' | 'difficulty' | 'featured' | 'tag';
  difficulty?: 'iniciante' | 'intermediario' | 'avancado';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  difficulty,
  size = 'md',
  children,
  className = ''
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'difficulty':
        if (!difficulty) return 'bg-gray-100 text-gray-800';
        return difficultyStyles[difficulty];

      case 'featured':
        return 'bg-purple-100 text-purple-800 border border-purple-200';

      case 'tag':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  const variantClasses = getVariantStyles();
  const sizeClasses = getSizeStyles();

  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}