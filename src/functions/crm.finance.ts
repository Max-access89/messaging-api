import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";
import { HandleGetPlan, HandleSetPlan } from "../handlers/crm/plan/handlers";

// Plan
app.http("crm-set-plan", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleSetPlan),
  route: "crm/create/plan",
});

app.http("crm-get-plan", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetPlan),
  route: "crm/get/plan",
});
