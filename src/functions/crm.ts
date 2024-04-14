import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";
import {
  HandleCreateOpportunity,
  HandleListOpportunities,
} from "../handlers/crm/opportunities";

import {
  HandleCreateLead,
  HandleDeleteLead,
  HandleGetLead,
  HandleListLead,
  HandleUpdateLead,
} from "../handlers/crm/lead/handlers";

// Lead
app.http("crm-get-lead", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetLead),
  route: "crm/get/lead/{id}",
});

app.http("crm-create-lead", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateLead),
  route: "crm/create/lead",
});

app.http("crm-list-lead", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListLead),
  route: "crm/list/lead",
});

app.http("crm-update-lead", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateLead),
  route: "crm/update/lead/{id}",
});

app.http("crm-delete-lead", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteLead),
  route: "crm/delete/lead/{id}",
});

// Opportunities
app.http("crm-create-opportunity", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateOpportunity),
  route: "crm/create/opportunity",
});

app.http("crm-list-opprtunities", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListOpportunities),
  route: "crm/list/opportunity",
});
