import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

export const accountRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const data = ctx.prisma.bankAccount.findMany()
    console.log(data, "data");
    return data
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

  }),
  update: publicProcedure.input(
    z.object({
      balance: z.number(),
      type: z.string(),
      name: z.string(),
      userId: z.string(),
      id: z.string().optional(),
    }),
  ).mutation(async ({ ctx, input }) => {
    if (input && input.id) {
      const accountId = input.id
      delete input.id
      await ctx.prisma.bankAccount.update({
        where:{id:accountId},
        data: input,
      });

      const data = await ctx.prisma.bankAccount.findMany()

      return data
    }

  }),
  delete: publicProcedure.input(
    z.object({
      id: z.string(),
    }),
  ).mutation(async ({ ctx, input }) => {
    if (input && input.id) {
      const accountId = input.id
      await ctx.prisma.bankAccount.delete({
        where: {id: accountId}
      })
      const data = await ctx.prisma.bankAccount.findMany()

      return data
    }

  })
});
