import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(error: ValidationError): Errors {
    const validationErrors: Errors = {};

    error.inner.forEach(err => {
        if (err.path != null) {
            validationErrors[err.path] = err.message;
        }
    });
    return validationErrors;
}
