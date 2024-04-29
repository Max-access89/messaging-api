import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";
import { HandleGetPlan, HandleSetPlan } from "../handlers/crm/plan/handlers";
import {
  HandleGetForecast,
  HandleSetForecast,
} from "../handlers/crm/forecast/handlers";
import {
  HandleCreateForecastByLeader,
  HandleListForecastByLeader,
} from "../handlers/crm/forecastByLeader/handlers";

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

// Forecast By Leader
app.http("crm-set-forecast-by-leader", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateForecastByLeader),
  route: "crm/create/forecast/byleader",
});

app.http("crm-list-forecast-by-leader", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListForecastByLeader),
  route: "crm/list/forecast/byleader",
});
