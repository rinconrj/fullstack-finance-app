import React from "react";

type Account = {
  userId: string;
  name: string;
  type: string;
  balance: number;
};

interface Props {
  account: Account;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
}

export default function AddAccountModal({
  account,
  setModalOpen,
  handleInputChange,
  handleSubmit,
}: Props) {
  return (
    <div className="z-50z-50 fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 shadow-2xl shadow-black">
      <div className="absolute flex h-full w-full flex-col items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-1/4 rounded-lg bg-white p-4 shadow-2xl shadow-black">
          <h2 className="mb-2 ml-16 text-xl font-bold">New Account</h2>
          <form
            onSubmit={() => {
              console.log("object");
              handleSubmit();
            }}
            className="ml-7 space-y-4"
          >
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              type="text"
              name="name"
              value={account.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              type="text"
              name="type"
              value={account.type}
              onChange={handleInputChange}
              placeholder="Type"
            />
            <input
              className="rounded-lg border border-gray-300 px-3 py-2"
              type="number"
              name="balance"
              value={account.balance}
              onChange={handleInputChange}
              placeholder="Balance"
            />
            <button
              className="ml-12 mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              type="submit"
              onClick={() => {
                handleSubmit();
                setModalOpen(false);
              }}
            >
              Save Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
