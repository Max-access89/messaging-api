import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { Finances } from "../../../services/finances.services";
import { setForecastSchema } from "./validators";

export async function HandleSetForecast(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    try {
      const payload = setForecastSchema.parse(await request.json());

      // Save the forecast value, possibly using a service like Prisma
      Finances.SetForecast(payload, context.auth);

      return {
        status: 200,
        jsonBody: {
          responseInfo: responseInfo["success"],
          message: "forecast value has been set successfully.",
        },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export async function HandleGetForecast(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    {
      try {
        // Retrieve the forecast value from the database
        const forecast = await Finances.GetForecast(context.auth);

        return {
          status: 200,
          jsonBody: {
            responseInfo: responseInfo["success"],
            data: forecast,
          },
        };
      } catch (error) {
        return errorHandler(error);
      }
    }
  }
}
