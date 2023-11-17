import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import axios from "axios";
import { BrazilianBanks } from "~/types/types";

export const generalRouter = createTRPCRouter({
  getAllBrazilinaBanks: publicProcedure.query(async ({ ctx }) => {
    const result = await axios.get('https://brasilapi.com.br/api/banks/v1')
    return result.data as BrazilianBanks[] | []
  }),

});
