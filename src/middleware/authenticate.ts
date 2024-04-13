import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { config } from 'dotenv';
import createHttpError from 'http-errors';
import { JwtPayload, decode, verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { errorHandler } from '../features/error.handler';
import { variables } from '../utils/env';

type NextFunction = (
  request: HttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

config();
const client = jwksClient({
  jwksUri: `https://${variables.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

export async function Authenticate(
  request: HttpRequest,
  context: InvocationContext,
  nextFunction: NextFunction
): Promise<HttpResponseInit> {
  try {
    const [, token] = String(request.headers.get('authorization')).split(' ');

    if (!token) throw createHttpError[401]('Invalid Bearer Token');

    // decode token to obtain KID
    const decoded = decode(token, { complete: true }) as JwtPayload;

    // get signing key with KID
    const signingKey = await client.getSigningKey(decoded.header.kid);

    // verify token with signing key
    const verified = verify(token, signingKey.getPublicKey(), {
      audience: [variables.AUTH0_SPA_AUDIENCE],
      algorithms: ['RS256'],
    }) as JwtPayload;

    // append auth record to invocation context
    Object.assign(context, { ...context, auth: verified });

    // fire next function
    return nextFunction(request, context);
  } catch (error) {
    return errorHandler(error);
  }
}
