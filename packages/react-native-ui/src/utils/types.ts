export type SemanticColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ExtendedSize = '2xs' | Size | '2xl';

export interface InteractiveState {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFocused?: boolean;
}
