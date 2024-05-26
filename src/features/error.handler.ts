/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponseInit } from '@azure/functions';
import { BadRequest, Forbidden, NotFound, Unauthorized } from 'http-errors';
import { ZodError } from 'zod';
import { responseInfo } from './response.info';

export async function errorHandler(error: any): Promise<HttpResponseInit> {
  const errorResponse = error?.response?.data || error?.message;
  console.log(
    '🚀🚀 -> file: error.handler.ts:9 -> errorHandler -> errorResponse:',
    errorResponse
  );
  console.log(
    '🚀🚀 -> file: error.handler.ts:9 -> errorHandler -> error:',
    error
  );

  // default error map
  const errorMap = new Map();
  errorMap.set('status', 500);
  errorMap.set('responseInfo', responseInfo['serverError']);
  errorMap.set('message', errorResponse);

  // bad request error
  if (error instanceof BadRequest) {
    errorMap.set('status', 400);
    errorMap.set('responseInfo', responseInfo['clientError']);
    errorMap.set('message', errorResponse);
  }

  // unauthorized error
  if (error instanceof Unauthorized) {
    errorMap.set('status', 401);
    errorMap.set('responseInfo', responseInfo['unauthorized']);
    errorMap.set('message', errorResponse);
  }

  // forbidden error
  if (error instanceof Forbidden) {
    errorMap.set('status', 403);
    errorMap.set('responseInfo', responseInfo['forbidden']);
    errorMap.set('message', errorResponse);
  }

  // not found error
  if (error instanceof NotFound) {
    errorMap.set('status', 404);
    errorMap.set('responseInfo', responseInfo['notFound']);
    errorMap.set('message', errorResponse);
  }

  // validation error
  if (error instanceof ZodError) {
    errorMap.set('status', 400);
    errorMap.set('responseInfo', responseInfo['validationError']);
    errorMap.set(
      'message',
      error.errors.map((error) => {
        const errorPath = error.path
          .map((path, index) => {
            if (index === error.path.length - 1) return path;

            return `[${path}]`;
          })
          .join('');

        return `${errorPath ? `${errorPath}: ` : ''}${error.message}`;
      })
    );
  }

  // error response
  return {
    status: errorMap.get('status'),
    jsonBody: {
      responseInfo: responseInfo['clientError'],
      message: errorMap.get('message'),
    },
  };
}
