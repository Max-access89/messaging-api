import { app } from '@azure/functions';
import { HandleCreateLead, HandleListLead } from '../handlers/crm/lead';
import { Authenticate } from '../middleware/authenticate';

app.http('crm-create-lead', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (r, c) => Authenticate(r, c, HandleCreateLead),
  route: 'crm/create/lead',
});

app.http('crm-list-lead', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: (r, c) => Authenticate(r, c, HandleListLead),
  route: 'crm/list/lead',
});
