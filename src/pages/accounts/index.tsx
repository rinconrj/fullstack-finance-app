import React, { useEffect, useState } from "react";
import { Grid, Icon, Typography } from "@mui/material";
import { Card as MuiCard, CardBody, Card } from "@material-tailwind/react";
import AddAccountModal from "./AddAccountModal";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import AccountCard from "./AccountCard";
import { Account } from "~/types/types";
import axios from "axios";


const logos: { [key: string]: string } = {
  bradesco:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  itau: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banco_Ita%C3%BA_logo.svg",
  "Banco do Brasil":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  santander:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bradesco_logo.svg/1200px-Bradesco_logo.svg.png",
  bv: "https://www.bv.com.br/site/og_image.png",
  picpay:
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/PicPay_Logogrande.png",
  nubank:
    "https://logospng.org/download/nubank/logo-nu-nubank-roxo-icon-2048.png",
};

const colors: { [key: string]: string } = {
  itau: "#FF7200",
  nubank: "#612F74",
  picpay: "#22c25f",
  bv: "#616FC6",
};

export default function Account() {
  const { data: session } = useSession();
  const {data: brasilianBanks} = api.general.getAllBrazilinaBanks.useQuery()
  const { data} = api.bankAccount.getAll.useQuery();
  const [account, setAccount] = useState<Account>({
    userId: "",
    name: "",
    type: "",
    balance: 0.0,
    id: ''
  });
  const [accounts, setAccounts] = useState<Account[]>([])

  const { mutate: addAccount } = api.bankAccount.create.useMutation();
  const { mutate: updateAccount } = api.bankAccount.update.useMutation();
  const { mutate: deleteAccount } = api.bankAccount.delete.useMutation();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    if(data) {
      setAccounts(data)
    }
  },[data])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: any } = event.target;

    setAccount({
      ...account,
      [name]: name === "balance" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (update?:boolean) => {
    console.log(update, "update");
    if(update && account.id){
      updateAccount(account)
    }else{
      saveAccount(account);
    }
    setAccountinZero()
    setModalOpen(false);
  };

  const setAccountinZero = () => {
    setAccount({
      userId: "",
      name: "",
      type: "",
      balance: 0.0,
    });
  }

  const saveAccount = (accountData: Account) => {
    if (session?.user.id) {
      addAccount({ ...accountData, userId: session?.user.id });
    }
  };

  const handleDeleteAccount = (id:string) =>{
    if(id){
      deleteAccount({id})
    }
  }

  return (
    <Grid container>
      {modalOpen && (
        <AddAccountModal
          banks={brasilianBanks}
          account={account}
          setModalOpen={setModalOpen}
          setModalClose={()=>{
            setModalOpen(false)
            setAccountinZero()
          }}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      <Grid container></Grid>
      <Grid container></Grid>
      <Grid container spacing={3} className="m-7">
        <Grid item className="flex items-center">
          <Card
            className="over:bg-blue-600 mt-6  h-56  w-96 cursor-pointer shadow-sm shadow-gray hover:shadow-md"
            onClick={() => setModalOpen(true)}
          >
            <Grid item className="text-center">
              <Icon>+</Icon>
              <Typography variant="h5">Add Account</Typography>
            </Grid>
          </Card>
        </Grid>
        {accounts?.map((account, index) => (
          <Grid item key={index}>
            <AccountCard
              id={account.id || ''}
              balance={account.balance}
              name={account.name}
              logo={logos[account.name]}
              color={colors[account.name]}
              onClick={()=>{
                setAccount(account)
                setModalOpen(true)
              }}
              deleteCard={handleDeleteAccount}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
