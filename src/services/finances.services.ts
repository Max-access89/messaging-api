import { InvocationContext } from "@azure/functions";
import axios from "axios";
import { isEmpty } from "lodash";
import { variables } from "../utils/env";
import { PrismaClient } from "@prisma/client";
import { HandleListOpportunities } from "../handlers/crm/opportunities/handlers";

interface DocsData {
  doctype: string;
  [key: string]: any;
}

const prisma = new PrismaClient();

export async function SetPlan(value: number, auth: InvocationContext["auth"]) {
  try {
    // Check if the user is authenticated, you can add your authentication logic here

    // Create a new plan record in the database
    const plan = await prisma.plan.create({
      data: {
        planValue: value,
      },
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
    const plan = await prisma.plan.findFirst();

    if (!plan) {
      throw new Error("Plan not found");
    }

    return plan;
  } catch (error) {
    throw new Error("Failed to get plan: " + error);
  }
}
