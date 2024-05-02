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
  HandleCreateProspect,
  HandleDeleteProspect,
  HandleGetProspect,
  HandleListProspects,
  HandleUpdateProspect,
} from "../handlers/crm/prospect/handlers";
import {
  HandleCreateIssue,
  HandleDeleteIssue,
  HandleGetIssue,
  HandleListIssues,
  HandleUpdateIssue,
} from "../handlers/crm/cases/handlers";
import {
  HandleCreateSalesPerson,
  HandleDeleteSalesPerson,
  HandleGetSalesPerson,
  HandleListSalesPersons,
  HandleUpdateSalesPerson,
} from "../handlers/crm/salesPerson/handlers";

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

// Prospect
app.http("crm-create-prospect", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateProspect),
  route: "crm/create/prospect",
});

app.http("crm-list-prospect", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListProspects),
  route: "crm/list/prospect",
});

app.http("crm-get-prospect", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetProspect),
  route: "crm/get/Prospect/{id}",
});

app.http("crm-update-prospect", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateProspect),
  route: "crm/update/prospect/{id}",
});

app.http("crm-delete-prospect", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteProspect),
  route: "crm/delete/prospect/{id}",
});

// Cases
app.http("crm-create-case", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateIssue),
  route: "crm/create/case",
});

app.http("crm-list-case", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListIssues),
  route: "crm/list/case",
});

app.http("crm-get-case", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetIssue),
  route: "crm/get/case/{name}",
});

app.http("crm-update-case", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateIssue),
  route: "crm/update/case/{name}",
});

app.http("crm-delete-case", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteIssue),
  route: "crm/delete/case/{name}",
});

// Sales
app.http("crm-create-sales-team", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateSalesPerson),
  route: "crm/create/sales/team",
});

app.http("crm-list-sales-team", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleListSalesPersons),
  route: "crm/list/sales/team",
});

app.http("crm-get-sales-team", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleGetSalesPerson),
  route: "crm/get/sales/team/{name}",
});

app.http("crm-update-sales-team", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleUpdateSalesPerson),
  route: "crm/update/sales/team/{name}",
});

app.http("crm-delete-sales-team", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleDeleteSalesPerson),
  route: "crm/delete/sales/team/{name}",
});
