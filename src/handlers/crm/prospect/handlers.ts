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
  HandleCreateProspectSchema,
  HandleDeleteProspectSchema,
  HandleGetProspectSchema,
  HandleListProspectSchema,
  HandleUpdateProspectSchema,
} from "./validators";

export async function HandleCreateProspect(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleCreateProspectSchema.parse(await request.json());

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

export async function HandleListProspects(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleListProspectSchema.parse(
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

export async function HandleGetProspect(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = HandleGetProspectSchema.parse(request.params);
    const response = await GetDocById(id, "Prospect", context.auth);

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

// export async function HandleUpdateProspect(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const payload = HandleUpdateProspectSchema.parse(await request.json());
//     // const response = await SaveDocs(payload.id, payload, context.auth);

//     return {
//       status: 200,
//       jsonBody: {
//         responseInfo: responseInfo["success"],
//         // data: response,
//       },
//     };
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

export async function HandleUpdateProspect(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleUpdateProspectSchema.parse(await request.json());

    const name = payload.name;

    const existingData = await GetDocById(name, "Prospect", context.auth);

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

export async function HandleDeleteProspect(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = HandleDeleteProspectSchema.parse(request.params);
    const message = await DeleteDoc(id, context.auth);

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
