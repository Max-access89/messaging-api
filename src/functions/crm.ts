import { app } from '@azure/functions';
import { HandleCreateLead } from '../handlers/crm/lead';
import { Authenticate } from '../middleware/authenticate';

app.http('crm-create-lead', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (r, c) => Authenticate(r, c, HandleCreateLead),
  route: "/crm/create/lead"
});
