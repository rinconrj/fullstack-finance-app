import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
  getByEmail: publicProcedure.input(z.string()).query((async (opts) => {
    const { input, ctx } = opts;
    //      ^?
    // Retrieve the user with the given ID
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input,
      },
      include: {
        accounts: true,
        sessions: true,
        transactions: true,
        bankAccounts: true,
        creditCards: true,
        credits: true,
        payments: true,
      },
    });
    return user;
  })),

  create: publicProcedure.input(z.object({
    name: z.string(),
    provider: z.string(),
    email: z.string().email(),
  })).mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        provider: input.provider,
      },
    });
    return user;

  })
});
