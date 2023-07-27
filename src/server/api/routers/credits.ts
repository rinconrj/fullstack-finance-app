import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { Credit } from "@prisma/client";

export const creditsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result: Credit[] = await ctx.prisma.credit.findMany();

    return result;
  }),
  create: publicProcedure.input(
    z.object({
      userId: z.string(),
      paymentDate: z.date(),
      description: z.string(),
      amount: z.number(),
      account: z.string(),
      leftParts: z.number(),
    }),
  ).mutation(async ({ ctx, input }) => {
    if (input) {
      const data = await ctx.prisma.credit.create({
        data: input,
      });

      return data
    }

  })
});
