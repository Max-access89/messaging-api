// import { app } from "@azure/functions";

// import {
//   HandleCreateWallet,
//   HandleGetWallet,
//   HandleUpdateWallet,
//   HandleListWallets,
//   HandleDeleteWallet,
// } from "../handlers/wallet.module/wallet/handlers";
// import { Authenticate } from "../middleware/authenticate";

// app.http("wallet-create", {
//   methods: ["POST"],
//   authLevel: "anonymous",
//   handler: (r, c) => Authenticate(r, c, HandleCreateWallet),
//   route: "wallet/create",
// });

// app.http("wallet-get", {
//   methods: ["GET"],
//   authLevel: "anonymous",
//   handler: (r, c) => Authenticate(r, c, HandleGetWallet),
//   route: "wallet/get/{id}",
// });

// app.http("wallet-update", {
//   methods: ["POST"],
//   authLevel: "anonymous",
//   handler: (r, c) => Authenticate(r, c, HandleUpdateWallet),
//   route: "wallet/update/:id",
// });

// app.http("wallet-list", {
//   methods: ["GET"],
//   authLevel: "anonymous",
//   handler: (r, c) => Authenticate(r, c, HandleListWallets),
//   route: "wallet/list",
// });

// app.http("wallet-delete", {
//   methods: ["DELETE"],
//   authLevel: "anonymous",
//   handler: (r, c) => Authenticate(r, c, HandleDeleteWallet),
//   route: "wallet/delete/:id",
// });
