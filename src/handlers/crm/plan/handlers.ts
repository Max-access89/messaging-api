import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { SetPlanSchema } from "./validators";
import { HandleListOpportunitySchema } from "../opportunities/validators";
import { ListDocs } from "../../../services/erp.services";
import { GetPlan, SetPlan } from "../../../services/finances.services";

export async function HandleSetPlan(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    try {
      const payload = SetPlanSchema.parse(await request.json());

      // Save the plan value, possibly using a service like Prisma
      SetPlan(payload, context.auth);

      return {
        status: 200,
        jsonBody: {
          responseInfo: responseInfo["success"],
          message: "Plan value has been set successfully.",
        },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export async function HandleGetPlan(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  {
    {
      try {
        // Define a function to calculate the total opportunity amount
        const calculateTotalOpportunityAmount = async () => {
          try {
            // Define the payload for listing opportunities
            const payload = HandleListOpportunitySchema.parse(
              Object.fromEntries(request.query)
            );

            // Fetch all opportunities using ListDocs function
            const response = await ListDocs(payload, context.auth);

            const opportunities = response;

            // Check if opportunities array is empty or undefined
            if (!opportunities || opportunities.length === 0) {
              // Return 0 if there are no opportunities
              return 0;
            }

            // Calculate the sum of opportunity amounts
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

        // Retrieve the plan value from the database
        const plan = await GetPlan(context.auth);

        // Calculate the total opportunity amount
        const closed = await calculateTotalOpportunityAmount();

        // Calculate the gap to plan
        const gapToPlan = plan.plan_value - closed;

        return {
          status: 200,
          jsonBody: {
            responseInfo: responseInfo["success"],
            data: {
              plan_value: plan.plan_value,
              closed: closed,
              gap_to_plan: gapToPlan < 0 ? 0 : gapToPlan,
              plan_currency: plan.plan_currency,
              tenure: plan.tenure,
            },
          },
        };
      } catch (error) {
        return errorHandler(error);
      }
    }
  }
}
