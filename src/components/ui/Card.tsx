// Remover import não utilizado

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg border border-gray-100';
      case 'outlined':
        return 'bg-transparent border-2 border-gray-200';
      case 'filled':
        return 'bg-gray-50 border border-gray-200';
      default:
        return 'bg-white shadow-sm border border-gray-200';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-12';
      default:
        return 'p-6';
    }
  };

  const baseClasses = 'rounded-lg transition-all duration-200';
  const variantClasses = getVariantStyles();
  const paddingClasses = getPaddingStyles();
  const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-md' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${paddingClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}