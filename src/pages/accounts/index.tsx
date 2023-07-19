import React, { useState } from 'react'
import { Grid, Icon, Typography } from '@mui/material'
import { Card as MuiCard, CardBody } from '@material-tailwind/react'
import AddAccountModal from './AddAccountModal';

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
  const [account, setAccount] = useState<Account>({
    userId: '',
    name: '',
    type: '',
    balance: 0.0
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Handle input changes
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // You can perform any necessary validation here before saving the account

    // Save the account using your desired method (e.g., API call, database operation)
    saveAccount(account);

    // Clear the form fields
    setAccount({
      userId: '',
      name: '',
      type: '',
      balance: 0.0
    });

    // Open the modal
    setModalOpen(true);
  };

  // Function to save the account
  const saveAccount = (accountData:Account) => {
    // Here you can perform the logic to save the account using your preferred method
    console.log('Saving account:', accountData);
    // Replace the console.log statement with your actual save logic
  };






  return (
  <Grid container>
    {modalOpen && <AddAccountModal account={account} setModalOpen={setModalOpen} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>}
      <Grid container></Grid>
      <Grid container></Grid>
      <Grid container>
        <Grid item>
        <Card onClick={() => setModalOpen(true)}>
          <Grid className='text-center'>
          <Icon>+</Icon>
          <Typography variant='h5'>Add Account</Typography>
          </Grid>
        </Card>
          </Grid>
      </Grid>

     </Grid>)
}
