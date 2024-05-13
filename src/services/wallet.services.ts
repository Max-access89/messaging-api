// import { InvocationContext } from "@azure/functions";
// import { PrismaClient } from "@prisma/client";
// import {
//   walletType,
// } from "../utils/types";

// interface DocsData {
//   doctype: string;
//   [key: string]: any;
// }

// const prisma = new PrismaClient();

// export async function CreateWallet(
//   data: walletType,
//   auth: InvocationContext["auth"]
// ) {
//   try {
//     // Check if the user is authenticated, you can add your authentication logic here

//     // Create a new plan record in the database
//     const userwallet = await prisma.wallet.create({
//       data: data,
//     });

//     return userwallet;
//   } catch (error) {
//     throw new Error("Failed to activate wallet: " + error);
//   }
// }

// export async function GetWallet(id: string, auth: InvocationContext["auth"]) {
//   try {
//     // Check if the user is authenticated, you can add your authentication logic here

//     const userwallet = await prisma.wallet.findFirst({
//       where: {
//         id: id,
//       },
//     });

//     if (!userwallet) {
//       throw new Error("Wallet not found");
//     }

//     return userwallet;
//   } catch (error) {
//     throw new Error("Failed to get wallet: " + error);
//   }
// }

// export async function ListWallets(auth: InvocationContext["auth"]) {
//   try {
//     // Check if the user is authenticated, you can add your authentication logic here

//     const userwallet = await prisma.wallet.findMany();

//     if (!userwallet) {
//       throw new Error("wallet not found");
//     }

//     return userwallet;
//   } catch (error) {
//     throw new Error("Failed to get wallet: " + error);
//   }
// }

// export async function UpdateWallet(
//     id: string,
//     data: Partial<walletType>,
//     auth: InvocationContext["auth"]
//   ) {
//     try {
//       // Check if the user is authenticated, you can add your authentication logic here

//       const updatedWallet = await prisma.wallet.update({
//         where: { id },
//         data,
//       });

//       return updatedWallet;
//     } catch (error) {
//       throw new Error("Failed to update wallet: " + error);
//     }
//   }

//   export async function DeleteWallet(id: string, auth: InvocationContext["auth"]) {
//     try {
//       // Check if the user is authenticated, you can add your authentication logic here

//       const deletedWallet = await prisma.wallet.delete({
//         where: { id },
//       });

//       return deletedWallet;
//     } catch (error) {
//       throw new Error("Failed to delete wallet: " + error);
//     }
//   }

//   export const Wallet = {
//     ListWallets,
//     GetWallet,
//     CreateWallet,
//     UpdateWallet,
//     DeleteWallet,
//   };
