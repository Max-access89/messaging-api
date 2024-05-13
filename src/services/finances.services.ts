import { InvocationContext } from "@azure/functions";
import axios from "axios";
import { isEmpty } from "lodash";
import { variables } from "../utils/env";
import { PrismaClient } from "@prisma/client";
import { HandleListOpportunities } from "../handlers/crm/opportunities/handlers";
import { ForecastByLeaderItem, ForecastItem, PlanItem } from "../utils/types";

interface DocsData {
  doctype: string;
  [key: string]: any;
}

const prisma = new PrismaClient();

export async function SetPlan(data: PlanItem, auth: InvocationContext["auth"]) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    // Create a new plan record in the database
    const plan = await prisma.plan.create({
      data: data,
    });

    return plan;
  } catch (error) {
    throw new Error("Failed to set plan: " + error);
  }
}

export async function GetPlan(auth: InvocationContext["auth"]) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    // Retrieve the plan record from the database
    // const plan = await prisma.plan.findFirst();

    const plan = await prisma.plan.findFirst({
      orderBy: {
        created_at: "desc", // Sort plans by creation timestamp in descending order
      },
    });

    if (!plan) {
      throw new Error("Plan not found");
    }

    return plan;
  } catch (error) {
    throw new Error("Failed to get plan: " + error);
  }
}

export async function SetForecast(
  data: ForecastItem,
  auth: InvocationContext["auth"]
) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    const forecast = await prisma.foreCast.create({
      data: data,
    });

    return forecast;
  } catch (error) {
    throw new Error("Failed to set forecast: " + error);
  }
}

export async function GetForecast(auth: InvocationContext["auth"]) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    const forecast = await prisma.foreCast.findFirst();

    if (!forecast) {
      throw new Error("Forecast not found");
    }

    return forecast;
  } catch (error) {
    throw new Error("Failed to get forecast: " + error);
  }
}

export async function CreateForecastByLeader(
  data: ForecastByLeaderItem,
  auth: InvocationContext["auth"]
) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    const forecast = await prisma.foreCastByLeader.create({
      data: data,
    });

    return forecast;
  } catch (error) {
    throw new Error("Failed to set forecast: " + error);
  }
}

export async function GetForecastByLeader(
  sales_person: string,
  auth: InvocationContext["auth"]
) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    console.log(sales_person);

    const forecast = await prisma.foreCastByLeader.findFirst({
      where: {
        sales_person: sales_person,
      },
    });

    if (!forecast) {
      throw new Error("Forecast not found");
    }

    return forecast;
  } catch (error) {
    throw new Error("Failed to get forecast: " + error);
  }
}

export async function ListForecastByLeader(auth: InvocationContext["auth"]) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    const forecast = await prisma.foreCastByLeader.findMany();

    if (!forecast) {
      throw new Error("Forecast not found");
    }

    return forecast;
  } catch (error) {
    throw new Error("Failed to get forecast: " + error);
  }
}

export const Finances = {
  GetForecast,
  SetForecast,
  GetPlan,
  SetPlan,
  CreateForecastByLeader,
  GetForecastByLeader,
  ListForecastByLeader,
};
