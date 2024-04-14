import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { ListDocs, SaveDocs } from "../../../services/erp.services";
import {
  HandleCreateOpportunitySchema,
  HandleListOpportunitySchema,
} from "./validators";

export async function HandleCreateOpportunity(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleCreateOpportunitySchema.parse(await request.json());

    const response = await SaveDocs(payload, context.auth);

    return {
      status: 200,
      jsonBody: {
        responseInfo: responseInfo["success"],
        data: response,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function HandleListOpportunities(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleListOpportunitySchema.parse(
      Object.fromEntries(request.query)
    );

    const response = await ListDocs(payload, context.auth);

    return {
      status: 200,
      jsonBody: {
        responseInfo: responseInfo["success"],
        data: response,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}
