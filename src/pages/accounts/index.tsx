import React, { useState } from "react";
import { Grid, Icon, Typography } from "@mui/material";
import { Card as MuiCard, CardBody, Card } from "@material-tailwind/react";
import AddAccountModal from "./AddAccountModal";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import AccountCard from "./AccountCard";

type Account = {
  userId: string;
  name: string;
  type: string;
  balance: number;
};

const logos: { [key: string]: string } = {
  bradesco:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  itau: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banco_Ita%C3%BA_logo.svg",
  "Banco do Brasil":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  santander:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  "Caixa Econémica Federal":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  picpay:
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/PicPay_Logogrande.png",
  nubank:
    "https://upload.wikimedia.org/wikipedia/commons/f/f7/Nubank_logo_2021.svg",
};

const colors: { [key: string]: string } = {
  itau: "#FF7200",
  nubank: "#612F74",
  picpay: "#22c25f",
};

export default function Account() {
  const { data: session } = useSession();
  const bankAccounts = api.bankAccount.getAll.useQuery();
  const { mutate: addAccount } = api.bankAccount.create.useMutation();
  const [account, setAccount] = useState<Account>({
    userId: "",
    name: "",
    type: "",
    balance: 0.0,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: any } = event.target;

    setAccount({
      ...account,
      [name]: name === "balance" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = () => {
    saveAccount(account);

    setAccount({
      userId: "",
      name: "",
      type: "",
      balance: 0.0,
    });

    setModalOpen(true);
  };

  const saveAccount = (accountData: Account) => {
    if (session?.user.id) {
      addAccount({ ...accountData, userId: session?.user.id });
    }
  };

  return (
    <Grid container>
      {modalOpen && (
        <AddAccountModal
          account={account}
          setModalOpen={setModalOpen}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      <Grid container></Grid>
      <Grid container></Grid>
      <Grid container spacing={3} className="m-7">
        <Grid item className="flex items-center">
          <Card
            className="over:bg-blue-600 mt-6  h-56  w-96  cursor-pointer border-2 border-black  shadow-lg shadow-cyan-500/50 hover:shadow-2xl"
            onClick={() => setModalOpen(true)}
          >
            <Grid item className="text-center">
              <Icon>+</Icon>
              <Typography variant="h5">Add Account</Typography>
            </Grid>
          </Card>
        </Grid>
        {bankAccounts.data?.map((account, index) => (
          <Grid item key={index}>
            <AccountCard
              balance={account.balance}
              name={account.name}
              logo={logos[account.name]}
              color={colors[account.name]}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
