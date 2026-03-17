export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconProps {
  as: React.ElementType;
  className?: string;
  size?: IconSize | number;
  color?: string;
}
