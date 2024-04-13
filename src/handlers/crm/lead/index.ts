import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { errorHandler } from '../../../features/error.handler';
import { responseInfo } from '../../../features/response.info';
import { SaveDocs } from '../../../services/erp.services';
import { HandleCreateLeadSchema } from './validators';

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
        responseInfo: responseInfo['success'],
        data: response,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}
