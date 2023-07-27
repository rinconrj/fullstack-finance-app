import { createTRPCRouter } from "~/server/api/trpc";
import { transactionRouter } from "./routers/transactions";
import { userRouter } from "./routers/users";
import { accountRouter } from "./routers/accounts";
import { creditsRouter } from "./routers/credits";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transaction: transactionRouter,
  user: userRouter,
  bankAccount: accountRouter,
  credits: creditsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
