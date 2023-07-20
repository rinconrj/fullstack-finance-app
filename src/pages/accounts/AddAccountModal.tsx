import React from 'react'

type Account = {
  userId: string;
  name: string;
  type: string;
  balance: number;
};

interface Props {
  account:Account
  setModalOpen:React.Dispatch<React.SetStateAction<boolean>>
  handleInputChange:React.ChangeEventHandler<HTMLInputElement>
  handleSubmit:()=>void
}

export default function AddAccountModal({account, setModalOpen, handleInputChange, handleSubmit}: Props) {
  return (
    <div className="z-50 fixed top-0 left-0 flex items-center justify-center w-full h-full z-50z-50 bg-gray-900 bg-opacity-50 shadow-2xl shadow-black">
    <div className="absolute flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-2xl shadow-black w-1/4">
      <h2 className="text-xl font-bold mb-2 ml-16">New Account</h2>
      <form onSubmit={()=>{
        console.log('object');
        handleSubmit()
      }

        } className="space-y-4 ml-7">
        <input
          className="border border-gray-300 rounded-lg px-3 py-2"
          type="text"
          name="name"
          value={account.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          className="border border-gray-300 rounded-lg px-3 py-2"
          type="text"
          name="type"
          value={account.type}
          onChange={handleInputChange}
          placeholder="Type"
        />
        <input
          className="border border-gray-300 rounded-lg px-3 py-2"
          type="number"
          name="balance"
          value={account.balance}
          onChange={handleInputChange}
          placeholder="Balance"
        />
          <button
            className="mt-4 ml-12 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
            type="submit"
            onClick={()=>{
              handleSubmit()
              setModalOpen(false)
            }}
          >
            Save Account
          </button>
      </form>
      </div>
    </div>
  </div>
  )
}
