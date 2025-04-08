import { FieldError } from '@/interfaces/middlewares/errors/validate-error';

export function fieldsValidationErrors(errors: any[]): FieldError[] {
  const fieldErrors: FieldError[] = [];

  for (const error of errors) {
    if (error.constraints) {
      fieldErrors.push({
        field: error.property,
        errors: Object.values(error.constraints),
      });
    }

    if (error.children && error.children.length > 0) {
      const nestedErrors = fieldsValidationErrors(error.children);
      nestedErrors.forEach((nestedError) => {
        fieldErrors.push({
          field: `${error.property}.${nestedError.field}`,
          errors: nestedError.errors,
        });
      });
    }
  }

  return fieldErrors;
}
