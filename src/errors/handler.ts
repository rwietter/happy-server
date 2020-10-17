import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
	[key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, resp) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return resp
      .status(400)
      .json({ maessage: 'Validation fails', errors });
  }

  return resp.status(500).json({ message: 'Internal server error' });
};

export { errorHandler };
