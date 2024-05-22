import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import {
  DeleteDoc,
  GetDocById,
  ListDocs,
  SaveDocs,
} from "../../../services/erp.services";
import {
  HandleCreateOpportunitySchema,
  HandleDeleteOpportunitySchema,
  HandleGetOpportunitySchema,
  HandleListOpportunitySchema,
  HandleUpdateOpportunitySchema,
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

export async function HandleGetOpportunity(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = HandleGetOpportunitySchema.parse(request.params);
    const response = await GetDocById(id, "Opportunity", context.auth);

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

export async function HandleUpdateOpportunity(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleUpdateOpportunitySchema.parse(await request.json());

    const name = payload.name;

    const existingData = await GetDocById(name, "Opportunity", context.auth);

    console.log(payload);

    const completeData = {
      ...existingData,
      ...payload,
    };

    const response = await SaveDocs(completeData, context.auth);

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

export async function HandleDeleteOpportunity(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = HandleDeleteOpportunitySchema.parse(request.params);
    const message = await DeleteDoc(id, "Opportunity", context.auth);

    return {
      status: 200,
      jsonBody: {
        responseInfo: responseInfo["success"],
        message: message,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}
