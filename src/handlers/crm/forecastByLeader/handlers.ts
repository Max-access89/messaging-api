import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { Finances } from "../../../services/finances.services";
import { createForecastByLeaderSchema } from "./validators";

export async function HandleCreateForecastByLeader(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    try {
      const payload = createForecastByLeaderSchema.parse(await request.json());

      // Save the forecast value, possibly using a service like Prisma
      Finances.CreateForecastByLeader(payload, context.auth);

      return {
        status: 200,
        jsonBody: {
          responseInfo: responseInfo["success"],
          message: "Forecast has been set successfully.",
        },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export async function HandleListForecastByLeader(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    {
      try {
        // Retrieve the forecast value from the database
        const forecast = await Finances.ListForecastByLeader(context.auth);

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

// export async function HandleGetForecastByLeader(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   {
//     {
//       try {
//         // Retrieve the forecast value from the database
//         const forecast = await Finances.GetForecastByLeader(context.auth);

//         return {
//           status: 200,
//           jsonBody: {
//             responseInfo: responseInfo["success"],
//             data: forecast,
//           },
//         };
//       } catch (error) {
//         return errorHandler(error);
//       }
//     }
//   }
// }
