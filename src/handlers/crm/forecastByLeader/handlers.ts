import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { Finances } from "../../../services/finances.services";
import {
  createForecastByLeaderSchema,
  getForecastByLeaderSchema,
} from "./validators";
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

        const calculateForecastAmount = async (
          salesPerson: string,
          status?: string
        ) => {
          try {
            let filters;

            if (!status) {
              filters = JSON.stringify([
                ["Opportunity", "assigned_sales_person", "=", salesPerson],
              ]);
            } else {
              filters = JSON.stringify([
                ["Opportunity", "status", "=", status],
                ["Opportunity", "assigned_sales_person", "=", salesPerson],
              ]);
            }

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
            item.sales_person
          );
        }

        for (let item of forecastByLeader) {
          item.won_amount = await calculateForecastAmount(
            item.sales_person,
            "Closed"
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

export async function HandleGetForecastByLeader(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    {
      try {
        const { sales_person } = request.params;

        const calculateForecastAmount = async (
          salesPerson: string,
          status?: string
        ) => {
          try {
            let filters;

            if (!status) {
              filters = JSON.stringify([
                ["Opportunity", "assigned_sales_person", "=", salesPerson],
              ]);
            } else {
              filters = JSON.stringify([
                ["Opportunity", "status", "=", status],
                ["Opportunity", "assigned_sales_person", "=", salesPerson],
              ]);
            }

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

        const forecastByLeader = await Finances.GetForecastByLeader(
          sales_person,
          context.auth
        );

        forecastByLeader.forecast_amount = await calculateForecastAmount(
          forecastByLeader.sales_person
        );

        forecastByLeader.won_amount = await calculateForecastAmount(
          forecastByLeader.sales_person,
          "Closed"
        );

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
