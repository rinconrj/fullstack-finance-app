import { Grid, Typography } from "@mui/material";
import CustomCard from "../CustomCard";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0);

  const { data: user } = api.user.getByEmail.useQuery(
    session?.user?.email as string
  );
  useEffect(() => {
    if (user) {
      const balance = user?.bankAccounts.reduce((acc, bankAccount) => {
        return acc + bankAccount.balance;
      }, 0);

      setBalance(balance);
    }
  }, [user]);

  return (
    <Grid container>
      <Grid container spacing={3}>
        <Grid item xs={12} className="ml-8 mt-12">
          <Typography className="w-full text-3xl tracking-[0.28] text-[#0f1016]">
            Bienvenido {user?.name}
          </Typography>
        </Grid>
        <Grid item className={`m-3 flex place-items-center content-around`}>
          <CustomCard
            title={"Saldo Actual"}
            value={balance}
            className="m-6 h-40 w-60 bg-green-500"
          />
          <CustomCard
            title={"Ingresos"}
            value={0}
            className="m-6 h-40 w-60 bg-blue-500"
          />
          <CustomCard
            title={"Gastos"}
            value={0}
            className="m-6 h-40 w-60 bg-red-500"
          />
          <CustomCard
            title={"Deudas"}
            value={0}
            className="m-6 h-40 w-60 bg-gray-800"
          />
        </Grid>
        <Grid container></Grid>
      </Grid>
    </Grid>
  );
}
