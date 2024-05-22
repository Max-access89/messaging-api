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
  HandleCreateIssueSchema,
  HandleDeleteIssueSchema,
  HandleGetIssueSchema,
  HandleListIssueSchema,
  HandleUpdateIssueSchema,
} from "./validators";

export async function HandleCreateIssue(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleCreateIssueSchema.parse(await request.json());

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

export async function HandleListIssues(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleListIssueSchema.parse(
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

export async function HandleGetIssue(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { name } = HandleGetIssueSchema.parse(request.params);
    const response = await GetDocById(name, "Issue", context.auth);

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

// export async function HandleUpdateIssue(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const payload = HandleUpdateIssueSchema.parse(await request.json());
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

export async function HandleUpdateIssue(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload = HandleUpdateIssueSchema.parse(await request.json());

    const name = payload.name;

    const existingData = await GetDocById(name, "Issue", context.auth);

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

export async function HandleDeleteIssue(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const { name } = HandleDeleteIssueSchema.parse(request.params);
    const message = await DeleteDoc(name, "Issue", context.auth);

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
