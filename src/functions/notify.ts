import { app } from "@azure/functions";

import { Authenticate } from "../middleware/authenticate";
import { HandleCreateNotificationItem } from "../handlers/notify/item/handlers";


app.http("messaging-send", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: (r, c) => Authenticate(r, c, HandleCreateNotificationItem),
  route: "messaging/send",
});
