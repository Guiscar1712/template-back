import { AppError } from './app-error';

export interface FieldError {
  field: string;
  errors: string[];
}

export class ValidateError extends AppError {
  constructor(errors: FieldError[]) {
    super('Validation failed', 400, errors);
  }
}
