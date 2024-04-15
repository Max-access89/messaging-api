import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";

import {
  HandleCreateLead,
  HandleDeleteLead,
  HandleGetLead,
  HandleListLead,
  HandleUpdateLead,
} from "../handlers/crm/lead/handlers";
import {
  HandleCreateOpportunity,
  HandleDeleteOpportunity,
  HandleGetOpportunity,
  HandleListOpportunities,
  HandleUpdateOpportunity,
} from "../handlers/crm/opportunities/handlers";

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

app.http("crm-get-opportunity", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetOpportunity),
  route: "crm/get/opportunity/{id}",
});

app.http("crm-update-opportunity", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateOpportunity),
  route: "crm/update/opportunity/{id}",
});

app.http("crm-delete-opportunity", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteOpportunity),
  route: "crm/delete/opportunity/{id}",
});
