import { Grid } from "@mui/material";
import CustomSelect from "~/components/CustomSelect";
import TransactionTable from "~/components/TransactionTable";

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export default function Transactions() {

  return (
  <Grid container direction="column" justifyContent="center">
    <Grid item className="flex content-center m-6">
      <CustomSelect title="Months" options={months} />
    </Grid>
    <Grid item className="flex overflow-hidden mx-10" xs={12}>
      <TransactionTable />
    </Grid>
  </Grid>
  )

};
