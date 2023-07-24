import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
  create: publicProcedure.input(
    z.object({
      description: z.string(),
      amount: z.string(),
      date: z.string(),
      category: z.string(),
      account: z.string(),
      userId: z.string()
    }),
  ).mutation(async ({ ctx, input }) => {
    if (input) {
      const data = await ctx.prisma.transaction.create({
        data: input,
      });

      return data
    }

  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    if (input) {
      const data = await ctx.prisma.transaction.delete({
        where: {
          id: input
        },
      });

      return data
    }

  }
  ),
});
