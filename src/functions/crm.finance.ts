import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";
import { HandleGetPlan, HandleSetPlan } from "../handlers/crm/plan/handlers";
import {
  HandleGetForecast,
  HandleSetForecast,
} from "../handlers/crm/forecast/handlers";

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

// Forecast
app.http("crm-set-forecast", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleSetForecast),
  route: "crm/create/forecast",
});

app.http("crm-get-forecast", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetForecast),
  route: "crm/get/forecast",
});
