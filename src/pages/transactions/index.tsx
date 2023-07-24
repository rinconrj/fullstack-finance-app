import { Grid } from "@mui/material";
import CustomSelect from "~/components/CustomSelect";
import TransactionTable from "~/components/TransactionTable";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Transactions() {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item className="m-6 flex content-center">
        <CustomSelect title="Months" options={months} />
      </Grid>
      <Grid item className="mx-10 flex overflow-hidden" xs={12}>
        <TransactionTable />
      </Grid>
    </Grid>
  );
}
