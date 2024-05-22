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
  HandleCreateLeadSchema,
  HandleListLeadSchema,
  HandleUpdateLeadSchema,
} from "./validators";

export async function HandleCreateLead(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleCreateLeadSchema.parse(await request.json());

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

export async function HandleListLead(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleListLeadSchema.parse(
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

export async function HandleGetLead(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = request.params;

    const response = await GetDocById(id, "Lead", context.auth);

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

// export async function HandleUpdateLead(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const { id } = request.params;
//     const payload = HandleUpdateLeadSchema.parse(await request.json());

//     // const response = await UpdateDoc(id, payload, context.auth);
//     // const response = await SaveDocs(payload, context.auth);

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

export async function HandleUpdateLead(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleUpdateLeadSchema.parse(await request.json());

    const name = payload.name;

    const existingData = await GetDocById(name, "Lead", context.auth);

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

export async function HandleDeleteLead(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { id } = request.params;

    const response = await DeleteDoc(id, "Lead", context.auth);

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
