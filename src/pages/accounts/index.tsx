import React, { use, useEffect, useState } from 'react'
import { Grid, Icon, Typography } from '@mui/material'
import { Card as MuiCard, CardBody } from '@material-tailwind/react'
import AddAccountModal from './AddAccountModal';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

type Account = {
  userId: string;
  name: string;
  type: string;
  balance: number;
};


function Card({children, onClick}: {children: React.ReactNode, onClick?: () => void}) {
  return (
        <MuiCard onClick={onClick} className="w-96 h-56 mt-6 shadow-lg shadow-cyan-500/50 hover:shadow-lg over:bg-blue-600 focus:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer">
          <CardBody className='flex justify-center items-center h-full' >
            {children}
          </CardBody>
        </MuiCard>
  )
}


export default function Account() {
  const { data: session, status } = useSession()
  const bankAccounts = api.bankAccount.getAll.useQuery()
  const {mutate: addAccount} = api.bankAccount.create.useMutation()
  const [account, setAccount] = useState<Account>({
    userId: '',
    name: '',
    type: '',
    balance: 0.0
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }:{name: string; value:any} = event.target;

    if(name === 'balance') value = parseFloat(value)

    setAccount({
      ...account,
      [name]: value
    });
  };

  const handleSubmit = () => {
    saveAccount(account);

    setAccount({
      userId: '',
      name: '',
      type: '',
      balance: 0.0
    });

    setModalOpen(true);
  };

const saveAccount = (accountData:Account) => {

    if(session?.user.id){
      addAccount({...accountData, userId: session?.user.id})
    }

  };

  return (
  <Grid container>
    {modalOpen && <AddAccountModal account={account} setModalOpen={setModalOpen} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>}
      <Grid container></Grid>
      <Grid container></Grid>
      <Grid container spacing={3}>
        <Grid item>
        <Card onClick={() => setModalOpen(true)}>
          <Grid className='text-center'>
          <Icon>+</Icon>
          <Typography variant='h5'>Add Account</Typography>
          </Grid>
        </Card>
        </Grid>
        {
          bankAccounts.data?.map((account, index) => (
            <Grid item key={index}>
              <Card>
                <Grid className='text-center'>
                <Typography variant='h5'>{account.name}</Typography>
                <Typography variant='h5'>{account.balance}</Typography>
                </Grid>
              </Card>
            </Grid>
          ))
        }
      </Grid>

     </Grid>)
}
