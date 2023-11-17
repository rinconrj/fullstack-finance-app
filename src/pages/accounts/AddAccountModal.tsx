import React, { Fragment, useEffect, useRef } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  SelectProps,
} from "@material-tailwind/react";
import { Account, BrazilianBanks } from "~/types/types";

interface AddAccountModalProps {
  banks?: BrazilianBanks[] | [];
  account: Account;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalClose: () => void;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (update?: boolean) => void;
}


interface CustomSelectInterface {
  options: AddAccountModalProps["banks"]
  label: string;
  className?: string;
  onChange: (v: any) => void
}
const BanksSelect: React.FC<CustomSelectInterface> = ({ options, label, className, ...props }) => {
  return (
    <div className={className}>
      <Select {...props} label={label}>
        {
          options?.map(({ fullName, code, ispb }, i) => (<Option key={i} value={String(code)} className="flex items-center gap-2">{fullName}</Option>))
        }
      </Select>
    </div>
  );
}

const BankInput: React.FC<any> = ({ label, placeholder, className, ...props }) => {
  return (
    <Fragment>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {label}
      </Typography>
      <Input
        {...props}
        size="lg"
        placeholder={placeholder}
        className={className || " !border-t-blue-gray-200 focus:!border-t-gray-900"}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </Fragment>
  )
}

export default function AddAccountModal({
  banks,
  account,
  setModalOpen,
  setModalClose,
  handleInputChange,
  handleSubmit,
}: AddAccountModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!modalRef?.current?.contains(event?.target as Node)) {
      setModalClose();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape as any);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape as any);
    };
  }, []);

  return (
      <div className="z-50 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 shadow-2xl shadow-black"
        ref={modalRef}
      >=
        <div id='background-modal' className="absolute flex h-full w-full flex-col items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-4">
            <h2 className="mb-2 text-xl font-bold text-center">{account.id ? 'Update Account' : 'New Account'}</h2>
            <form
              onSubmit={() => { }}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography  variant="h6" color="blue-gray" className="-mb-3">
                  Bank
                </Typography>
                <BanksSelect
                  options={banks?.filter(item => item.fullName && item.code)}
                  label="banks"
                  onChange={(element) => {
                    console.log(element);
                    return element
                  }}
                />
                <BankInput
                  value={account.name}
                  onChange={handleInputChange}
                  placeholder="type of account"
                  label={"Type"}
                />
                <BankInput
                  value={account.balance}
                  onChange={handleInputChange}
                  placeholder="type of account"
                  label={"Balance"}
                  type="balance"
                />

                <button
                  className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  type="submit"
                  onClick={() => {
                    handleSubmit(!!account.id);
                    setModalOpen(false);
                  }}
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
