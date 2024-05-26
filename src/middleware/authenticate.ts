import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { config } from "dotenv";
import createHttpError from "http-errors";
import { Jwt, JwtPayload, decode, verify } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { errorHandler } from "../features/error.handler";
import { variables } from "../utils/env";

type NextFunction = (
  request: HttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

config();
const client = jwksClient({
  jwksUri: `https://${String(process.env.AUTH0_DOMAIN)}/.well-known/jwks.json`,
});

export async function Authenticate(
  request: HttpRequest,
  context: InvocationContext,
  nextFunction: NextFunction
): Promise<HttpResponseInit> {
  try {
    const [, token] = String(request.headers.get("authorization")).split(" ");

    if (!token) throw createHttpError[401]("Invalid Bearer Token");

    const decoded = decode(token, { complete: true }) as Jwt;

    const kid = decoded.header.kid;
    const signingKey = await client.getSigningKey(kid);

    const auth = verify(token, signingKey.getPublicKey(), {
      audience: [variables.AUTH0_SPA_AUDIENCE, variables.AUTH0_API_AUDIENCE],
      algorithms: ["RS256"],
    }) as JwtPayload;

    // access tokens from client credentials
    // if (auth.sub?.includes("@clients")) {
    //   const metadata = JSON.parse(auth.metadata["data"]);

    //   Object.assign(auth, {
    //     ...auth,
    //     organization: {
    //       id: metadata.oid,
    //       name: metadata.org,
    //     },
    //     engine: {
    //       apiKey: metadata.key,
    //       apiSecret: metadata.secret,
    //       url: metadata.url,
    //     },
    //   });
    // }

    // Object.assign(context, { ...context, auth });

    const verified = verify(token, signingKey.getPublicKey(), {
      audience: [variables.AUTH0_SPA_AUDIENCE],
      algorithms: ["RS256"],
    }) as JwtPayload;

    // append auth record to invocation context
    Object.assign(context, {
      ...context,
      auth: { ...verified, engine: verified.erpnext },
    });

    // validate subscrition

    // await VerifySubscription(context);

    return nextFunction(request, context);
  } catch (error) {
    return errorHandler(error);
  }
}
