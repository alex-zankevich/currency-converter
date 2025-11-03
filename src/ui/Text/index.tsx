import { cn } from '@/lib';

type TextVariant = 'heading' | 'caption' | 'regular' | 'subtitle' | 'small';
type TextElement =
    | 'p'
    | 'span'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

const variantStyles: Record<TextVariant, string> = {
    heading: 'text-lg font-semibold text-neutral-950',
    subtitle: 'text-base font-medium text-neutral-950',
    regular: 'text-base font-normal text-neutral-950',
    caption: 'text-sm font-normal text-neutral-500',
    small: 'text-xs font-normal text-neutral-500',
};

export interface TextProps {
    variant?: TextVariant;
    as?: TextElement;
    children: React.ReactNode;
    className?: string;
    truncate?: boolean;
}

export function Text({
    variant = 'regular',
    as: Component = 'p',
    children,
    className = '',
    truncate = false,
}: TextProps) {
    const baseStyles = variantStyles[variant];
    const classes = cn(baseStyles, truncate && 'truncate', className);

    return <Component className={classes}>{children}</Component>;
}
