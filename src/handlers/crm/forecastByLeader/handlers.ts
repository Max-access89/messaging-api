import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { Finances } from "../../../services/finances.services";
import { createForecastByLeaderSchema } from "./validators";
import { ListDocs } from "../../../services/erp.services";
import { HandleListOpportunitySchema } from "../opportunities/validators";

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

// export async function HandleListForecastByLeader(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   {
//     {
//       try {
//         // Retrieve the forecast value from the database
//         const forecast = await Finances.ListForecastByLeader(context.auth);

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

export async function HandleListForecastByLeader(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    {
      try {
        // Retrieve the forecast value from the database
        const forecastByLeader = await Finances.ListForecastByLeader(
          context.auth
        );

        const calculateForecastAmount = async (opportunityID: string) => {
          try {
            const filters = JSON.stringify([["name", "=", opportunityID]]);

            // Parse request query with the filters
            const payload = HandleListOpportunitySchema.parse({ filters });

            const response = await ListDocs(payload, context.auth);

            const opportunities = response;

            if (!opportunities || opportunities.length === 0) {
              return 0;
            }

            const totalAmount = opportunities.reduce(
              (acc, opportunity) => acc + opportunity.opportunity_amount,
              0
            );

            return totalAmount;
          } catch (error) {
            throw new Error(
              "Failed to calculate total opportunity amount: " + error
            );
          }
        };

        const forecast_currency = "GHS";

        for (let item of forecastByLeader) {
          item.forecast_amount = await calculateForecastAmount(
            item.assigned_opportunity
          );
        }

        return {
          status: 200,
          jsonBody: {
            responseInfo: responseInfo["success"],
            data: forecastByLeader,
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
