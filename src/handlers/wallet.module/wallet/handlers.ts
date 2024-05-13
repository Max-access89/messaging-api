// import {
//   HttpRequest,
//   HttpResponseInit,
//   InvocationContext,
// } from "@azure/functions";
// import { errorHandler } from "../../../features/error.handler";
// import { responseInfo } from "../../../features/response.info";
// import {
//   CreateWalletSchema,
//   GetWalletSchema,
//   UpdateWalletSchema,
// } from "./validators";
// import { PrismaClient } from "@prisma/client";
// import { Wallet } from "../../../services/wallet.services";

// export async function HandleCreateWallet(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const { wallet_value, wallet_currency, id } =
//       CreateWalletSchema.parse(await request.json());

//       const data = {
//         id: id,
//         wallet_value,
//         wallet_currency,
//       },

//     const wallet = await Wallet.CreateWallet(data, context.auth);
//     return {
//       status: 200,
//       jsonBody: {
//         responseInfo: responseInfo["success"],
//         data: wallet,
//       },
//     };
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

// export async function HandleGetWallet(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const { walletId } = GetWalletSchema.parse(await request.json());

//     const wallet = await Wallet.GetWallet(walletId, context.auth);
//     if (!wallet) {
//       throw new Error("Wallet not found");
//     }
//     return {
//       status: 200,
//       jsonBody: {
//         responseInfo: responseInfo["success"],
//         data: wallet,
//       },
//     };
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

// export async function HandleUpdateWallet(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const walletId = parseInt(request.params.id, 10);

//     const { amount } = UpdateWalletSchema.parse(await request.json());

//     const wallet = await Wallet.({
//       where: { id: walletId },
//       data: {
//         wallet_value: {
//           increment: amount,
//         },
//       },
//     });
//     return {
//       status: 200,
//       jsonBody: {
//         responseInfo: responseInfo["success"],
//         data: wallet,
//       },
//     };
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

// export async function HandleListWallets(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<HttpResponseInit> {
//   try {
//     const wallets = await Wallet.ListWallets(context.auth);
//     return {
//       status: 200,
//       jsonBody: {
//         responseInfo: responseInfo["success"],
//         data: wallets,
//       },
//     };
//   } catch (error) {
//     return errorHandler(error);
//   }
// }

// // export async function HandleDeleteWallet(
// //   request: HttpRequest,
// //   context: InvocationContext
// // ): Promise<HttpResponseInit> {
// //   try {
// //     const walletId = parseInt(request.params.id, 10);
// //     await Wallet.delete({
// //       where: { id: walletId },
// //     });
// //     return {
// //       status: 200,
// //       jsonBody: {
// //         responseInfo: responseInfo["success"],
// //         message: "Wallet successfully deleted",
// //       },
// //     };
// //   } catch (error) {
// //     return errorHandler(error);
// //   }
// // }
