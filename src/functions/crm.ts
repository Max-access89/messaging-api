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
import {
  HandleCreateCustomer,
  HandleDeleteCustomer,
  HandleGetCustomer,
  HandleListCustomers,
  HandleUpdateCustomer,
} from "../handlers/crm/customers/handlers";
import {
  HandleCreateCampaign,
  HandleDeleteCampaign,
  HandleGetCampaign,
  HandleListCampaigns,
  HandleUpdateCampaign,
} from "../handlers/crm/campaign/handlers";

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

// Customer
app.http("crm-create-customer", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateCustomer),
  route: "crm/create/customer",
});

app.http("crm-list-customers", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListCustomers),
  route: "crm/list/customer",
});

app.http("crm-get-customer", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetCustomer),
  route: "crm/get/customer/{id}",
});

app.http("crm-update-customer", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateCustomer),
  route: "crm/update/customer/{id}",
});

app.http("crm-delete-customer", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteCustomer),
  route: "crm/delete/customer/{id}",
});

// Campaign
app.http("crm-create-campaign", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateCampaign),
  route: "crm/create/campaign",
});

app.http("crm-list-campaign", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListCampaigns),
  route: "crm/list/campaign",
});

app.http("crm-get-campaign", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetCampaign),
  route: "crm/get/campaign/{id}",
});

app.http("crm-update-campaign", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateCampaign),
  route: "crm/update/campaign/{id}",
});

app.http("crm-delete-campaign", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteCampaign),
  route: "crm/delete/campaign/{id}",
});
