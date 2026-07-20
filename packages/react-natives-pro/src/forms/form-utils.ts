/**
 * Schema-driven form engine: validation, conditional visibility, and wizard step gating.
 *
 * Pure so the rules can be tested exhaustively without rendering — validation logic is exactly
 * where silent bugs cost users their data.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'switch'
  | 'date';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  /** Message shown when `pattern` fails. */
  patternMessage?: string;
  /** Custom check. Return a message to fail, or null/undefined to pass. */
  validate?: (value: unknown, values: FormValues) => string | null | undefined;
}

/** Show the field only when another field's value matches. */
export interface FieldCondition {
  field: string;
  /** Defaults to `equals`. */
  operator?: 'equals' | 'notEquals' | 'in' | 'truthy' | 'falsy';
  value?: unknown;
}

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  options?: FieldOption[];
  rules?: FieldRule;
  showIf?: FieldCondition;
  /** Wizard step index. Omit for single-page forms. */
  step?: number;
  defaultValue?: unknown;
}

export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whether a field is currently visible given the form's values. */
export function isFieldVisible(field: FieldSchema, values: FormValues): boolean {
  const condition = field.showIf;
  if (!condition) return true;
  const other = values[condition.field];

  switch (condition.operator ?? 'equals') {
    case 'equals':
      return other === condition.value;
    case 'notEquals':
      return other !== condition.value;
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(other);
    case 'truthy':
      return Boolean(other);
    case 'falsy':
      return !other;
    default:
      return true;
  }
}

export function visibleFields(schema: FieldSchema[], values: FormValues): FieldSchema[] {
  return schema.filter((field) => isFieldVisible(field, values));
}

function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Validate a single field.
 *
 * Hidden fields always pass — a conditional field the user cannot see must never block
 * submission, which is the most common bug in schema-driven forms.
 */
export function validateField(field: FieldSchema, values: FormValues): string | null {
  if (!isFieldVisible(field, values)) return null;

  const value = values[field.name];
  const rules = field.rules ?? {};

  if (rules.required && isEmpty(value)) return `${field.label} is required`;
  // Every rule below only applies to a supplied value; empty + optional is valid.
  if (isEmpty(value)) return null;

  if (field.type === 'email' && typeof value === 'string' && !EMAIL_RE.test(value)) {
    return `${field.label} must be a valid email address`;
  }

  if (typeof value === 'string') {
    if (rules.minLength != null && value.length < rules.minLength) {
      return `${field.label} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength != null && value.length > rules.maxLength) {
      return `${field.label} must be at most ${rules.maxLength} characters`;
    }
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      return rules.patternMessage ?? `${field.label} is not in the expected format`;
    }
  }

  if (field.type === 'number') {
    const numeric = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(numeric)) return `${field.label} must be a number`;
    if (rules.min != null && numeric < rules.min) return `${field.label} must be at least ${rules.min}`;
    if (rules.max != null && numeric > rules.max) return `${field.label} must be at most ${rules.max}`;
  }

  if (rules.validate) {
    const custom = rules.validate(value, values);
    if (custom) return custom;
  }

  return null;
}

/** Validate every visible field. Returns `{}` when the form is valid. */
export function validateForm(schema: FieldSchema[], values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of schema) {
    const message = validateField(field, values);
    if (message) errors[field.name] = message;
  }
  return errors;
}

/** Initial values from `defaultValue`, with sensible per-type fallbacks. */
export function initialValues(schema: FieldSchema[]): FormValues {
  const values: FormValues = {};
  for (const field of schema) {
    if (field.defaultValue !== undefined) values[field.name] = field.defaultValue;
    else if (field.type === 'checkbox' || field.type === 'switch') values[field.name] = false;
    else if (field.type === 'multiselect') values[field.name] = [];
    else values[field.name] = '';
  }
  return values;
}

/** Distinct step indices present in the schema, in order. Single-page forms yield `[0]`. */
export function formSteps(schema: FieldSchema[]): number[] {
  const steps = new Set<number>();
  for (const field of schema) steps.add(field.step ?? 0);
  return Array.from(steps).sort((a, b) => a - b);
}

export function fieldsForStep(schema: FieldSchema[], step: number, values: FormValues): FieldSchema[] {
  return visibleFields(schema, values).filter((field) => (field.step ?? 0) === step);
}

/** Validate only the current step — a wizard must not report errors for pages not yet seen. */
export function validateStep(schema: FieldSchema[], step: number, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of fieldsForStep(schema, step, values)) {
    const message = validateField(field, values);
    if (message) errors[field.name] = message;
  }
  return errors;
}

export function canAdvance(schema: FieldSchema[], step: number, values: FormValues): boolean {
  return Object.keys(validateStep(schema, step, values)).length === 0;
}

/**
 * Next visible step, skipping steps whose fields are all hidden.
 * Returns the current step when there is nowhere further to go.
 */
export function nextStep(schema: FieldSchema[], step: number, values: FormValues): number {
  const steps = formSteps(schema);
  const index = steps.indexOf(step);
  for (let i = index + 1; i < steps.length; i += 1) {
    if (fieldsForStep(schema, steps[i], values).length > 0) return steps[i];
  }
  return step;
}

export function previousStep(schema: FieldSchema[], step: number, values: FormValues): number {
  const steps = formSteps(schema);
  const index = steps.indexOf(step);
  for (let i = index - 1; i >= 0; i -= 1) {
    if (fieldsForStep(schema, steps[i], values).length > 0) return steps[i];
  }
  return step;
}

export function isLastStep(schema: FieldSchema[], step: number, values: FormValues): boolean {
  return nextStep(schema, step, values) === step;
}

/** Strip values whose fields are hidden, so conditional branches don't submit stale data. */
export function prunedValues(schema: FieldSchema[], values: FormValues): FormValues {
  const out: FormValues = {};
  for (const field of visibleFields(schema, values)) out[field.name] = values[field.name];
  return out;
}
