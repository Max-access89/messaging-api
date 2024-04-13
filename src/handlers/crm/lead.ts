import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { errorHandler } from "../../features/error.handler";

export async function HandleCreateLead(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    
  } catch (error) {
    return errorHandler(error)
  }
}