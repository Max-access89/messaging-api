import { InvocationContext } from '@azure/functions';
import axios from 'axios';
import { variables } from '../utils/env';

interface SaveDocsData {
  doctype: string;
  [key: string]: any;
}

export async function SaveDocs(
  data: SaveDocsData,
  auth: InvocationContext['auth']
) {
  const formdata = new FormData();
  formdata.append('action', 'Save');
  formdata.append(
    'doc',
    JSON.stringify({ ...data, company: auth.organization.name })
  );

  const { data: response } = await axios<{ docs: [any] }>({
    method: 'POST',
    url: '/api/method/frappe.desk.form.save.savedocs',
    baseURL: variables.ERP_BASEURL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `token ${auth.engine.apiKey}:${auth.engine.apiSecret}`,
    },
    data: formdata,
  });

  return response?.docs.at(0);
}
