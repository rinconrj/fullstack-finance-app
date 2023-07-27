"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
} from "@material-tailwind/react";
import { Modal } from "@mui/base";
import { Typography } from "@mui/material";
import { Credit } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FC, Suspense, useEffect, useState } from "react";
import { CustomInput } from "~/components/CustomInput";
import CustomSelect from "~/components/CustomSelect";
import EditableRow from "~/components/TransactionTable/components/EditableRow";
import { api } from "~/utils/api";
import { format, compareAsc, set } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";

interface ParsedData {
  id: string;
  paymentDate: string;
  description: string;
  amount: number;
  account: string;
  leftParts: number;
}

interface CreditModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface CreditBody {
  paymentDate: string;
  description: string;
  amount: number;
  account: string;
  leftParts: number;
  userId: string;
}

const HEADER_TITLE: string[] = [
  "payment date",
  "description",
  "amount",
  "account",
  "total",
  "leftParts",
];

const TABLE_HEAD = [
  "payment date",
  "description",
  "amount",
  "account",
  "total",
  "leftParts",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  borderRadius: "10px",
  p: 4,
  boxShadow: "0px 4px 30px 0px rgba(46, 45, 116, 0.5)",
};

function CreditModal({ handleSubmit, isOpen, onClose }: CreditModalProps) {
  const { data: session } = useSession();
  const { data: user } = api.user.getByEmail.useQuery(
    session?.user.email || ""
  );
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [leftParts, setLeftParts] = useState(0);
  const [account, setAccount] = useState("");

  const newCredit = {
    paymentDate: format(paymentDate, "dd-MM-yyyy"),
    description,
    amount,
    account,
    leftParts,
    userId: user?.id || "null",
  };

  return (
    <Modal
      open={isOpen}
      style={style}
      onClose={onClose}
      closeAfterTransition
      disableRestoreFocus={false}
    >
      <div className=" flex w-full flex-col justify-center overflow-hidden rounded-lg bg-white p-12">
        <Typography className="mr-2 text-center text-[24px]  ">
          Add New Credit
        </Typography>
        <form onSubmit={() => handleSubmit(newCredit)}>
          <div className="flex flex-col gap-3">
            <DatePicker
              label="Payment Date:"
              format="dd-MM-yyyy"
              value={paymentDate}
              onChange={(e) => (e ? setPaymentDate(e) : e)}
            />
            <CustomInput
              label="Description:"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <CustomInput
              label="Amount:"
              name="amount"
              onChange={(e) => {
                const { value } = e.target;
                const numberValue = Number(value);
                if (!isNaN(numberValue) && numberValue > 0) {
                  setAmount(parseFloat(e.target.value));
                }
              }}
              value={amount}
              type="number"
            />
            <CustomSelect
              label="Accounts"
              name="account"
              options={user?.bankAccounts.map((item) => item.name) || []}
              onChange={(e) => setAccount(e)}
            />
            <CustomInput
              label="Left Parts"
              name="leftParts"
              value={leftParts}
              onChange={(e) => {
                const { value } = e.target;
                const numberValue = Number(value);
                if (!isNaN(numberValue)) {
                  setLeftParts(Number(numberValue));
                }
              }}
            />
          </div>
          <button className="mt-6 flex h-10 flex-col justify-center overflow-hidden rounded-lg bg-[#883dcf] px-3">
            <Typography className="semi-bold whitespace-nowrap text-sm leading-[20px] tracking-[0.07] text-white">
              Submit
            </Typography>
          </button>
        </form>
      </div>
    </Modal>
  );
}

const CreditsHeader: FC<any> = ({ openModal }) => {
  return (
    <div className="flex h-20 w-full flex-row items-center justify-between border-x-0 border-b border-t-0 border-solid border-[#f0f1f3] bg-white px-6">
      <div className="flex flex-row items-center gap-2">
        <Typography className="w-3/5 whitespace-nowrap text-xl font-semibold leading-[30px] tracking-[0.2] ">
          Credits
        </Typography>
      </div>

      <div className="flex w-1/2 flex-row items-center justify-end">
        <div className="mr-10 flex h-10 w-2/5 flex-row items-center justify-center gap-2 overflow-hidden rounded-lg border border-solid border-[#e0e2e7] bg-white">
          <img
            src="https://file.rendit.io/n/CMgB2byXLcAvpHrhlzX8.svg"
            className="min-h-0 w-4 min-w-0 shrink-0"
          />
          <Typography className="w-3/5 whitespace-nowrap text-sm leading-[20px] tracking-[0.07] text-[#858d9d]">
            Select Month
          </Typography>
        </div>
        <button className="flex h-10 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#f4ecfb]">
          <Typography className="w-3/5 whitespace-nowrap text-sm font-semibold leading-[20px] tracking-[0.07] text-[#883dcf]">
            See All
          </Typography>
        </button>
        <button
          className="ml-3 flex h-10 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#22caad]"
          onClick={() => openModal()}
        >
          <Typography className="w-3/5 whitespace-nowrap text-sm font-semibold leading-[20px] tracking-[0.07] text-[#116557]">
            add
          </Typography>
        </button>
      </div>
    </div>
  );
};

const CreditsBody: FC<{ data?: Credit[] }> = ({ data }) => {
  const parsedData: ParsedData[] | undefined = data?.map((item) => {
    return {
      id: item.id,
      paymentDate: item.paymentDate,
      description: item.description,
      amount: item.amount,
      account: item.account.toUpperCase(),
      total: (item.amount * item.leftParts).toFixed(2),
      leftParts: item.leftParts,
    };
  });

  return (
    <div className="flex w-auto flex-row items-center overflow-auto">
      <Card className="h-full w-full ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography className="w-[149px] text-center text-sm font-medium capitalize leading-[20px]  ">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length !== 0 &&
              parsedData?.map((item, index) => {
                const keys = Object.keys(item);

                const rowValues: any = [];

                keys.forEach((key, i) => {
                  const classes = "p-4 border-b border-blue-gray-50";

                  if (key === "id") return;
                  const value = (item as any)[key];
                  rowValues.push(
                    <EditableRow
                      // isEditable={isEditable}
                      classes={classes}
                      title={key}
                      value={value}
                      index={index}
                      // handleFieldChange={handleFieldChange}
                    />
                  );
                });

                return <tr>{rowValues}</tr>;
              })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const Credits: FC<any> = () => {
  const { data: session } = useSession();
  const { data } = api.credits.getAll.useQuery();
  const { mutate, isLoading } = api.credits.create.useMutation();
  const [creditData, setCreditData] = useState(data);

  const [openModal, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data) {
      setCreditData(data);
    }
  }, [data]);

  const handleSubmit = async (body: CreditBody) => {
    if (body?.userId) {
      mutate({ ...body });
    }

    handleClose();
  };
  console.log(creditData);
  return (
    <div
      className="mt-11 flex w-full justify-center"
      style={
        openModal
          ? {
              filter: "blur(3px)",
              // backgroundColor: "var(--neutral-black-black-500, #1D1F2C)",
              opacity: "0.25",
              boxShadow: "0 0 0 99999px rgba(0, 0, 0, 0.2)",
            }
          : {}
      }
    >
      {openModal && (
        <CreditModal
          handleSubmit={handleSubmit}
          isOpen={openModal}
          onClose={handleClose}
        />
      )}

      <Card className="align-center w-auto">
        <CardHeader floated={false}>
          <CreditsHeader openModal={() => handleOpen()} />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <CreditsBody data={creditData} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Credits;
