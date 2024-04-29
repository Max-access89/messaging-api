import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { Finances } from "../../../services/finances.services";
import { setForecastSchema } from "./validators";
import { ListDocs } from "../../../services/erp.services";
import { HandleListOpportunitySchema } from "../opportunities/validators";

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

        const forecastTenure = forecast.tenure;

        let tenureStartDate: Date;
        let tenureEndDate: Date;

        switch (forecastTenure) {
          case "Quarterly":
            // Calculate start and end date for quarterly tenure
            tenureStartDate = new Date(); // Start date can be today
            tenureEndDate = new Date(); // End date can be 3 months from today
            tenureEndDate.setMonth(tenureEndDate.getMonth() + 3);
            break;

          case "Annual":
            tenureStartDate = new Date();
            tenureEndDate = new Date();
            tenureEndDate.setFullYear(tenureEndDate.getFullYear() + 1);
            break;

          case "Biannual":
            tenureStartDate = new Date();
            tenureEndDate = new Date();
            tenureEndDate.setMonth(tenureEndDate.getMonth() + 6);
            break;

          default:
            break;
        }

        const calculateTotalOpportunityAmount = async () => {
          try {
            const payload = HandleListOpportunitySchema.parse(
              Object.fromEntries(request.query)
            );

            const response = await ListDocs(payload, context.auth);

            const opportunities = response;

            const opportunitiesInTenure = opportunities.filter((item) => {
              const creationDate = item.creation;
              return (
                creationDate >= tenureStartDate && creationDate <= tenureEndDate
              );
            });

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

        const forecast_value = await calculateTotalOpportunityAmount();

        const forecast_currency = "GHS";

        const completeData = {
          ...forecast,
          forecast_value,
          forecast_currency,
        };

        return {
          status: 200,
          jsonBody: {
            responseInfo: responseInfo["success"],
            data: completeData,
          },
        };
      } catch (error) {
        return errorHandler(error);
      }
    }
  }
}
