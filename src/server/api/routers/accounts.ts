import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

export const accountRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bankAccount.findMany();
  }),
  create: publicProcedure.input(
    z.object({
      balance: z.number(),
      type: z.string(),
      name: z.string(),
      userId: z.string()
    }),
  ).mutation(async ({ ctx, input }) => {
    if (input) {
      const data = await ctx.prisma.bankAccount.create({
        data: input,
      });

      return data
    }

  })
});
