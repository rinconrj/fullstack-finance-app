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
import { FC, Suspense, useState } from "react";
import { CustomInput } from "~/components/CustomInput";
import CustomSelect from "~/components/CustomSelect";
import { api } from "~/utils/api";

interface ParsedData {
  id: string;
  paymentDate: Date;
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <CustomInput
              type="date"
              label="Payment Date:"
              name="paymentDate"
              value={paymentDate.toISOString().substr(0, 10)}
              onChange={(e) => setPaymentDate(new Date(e.target.value))}
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

const CreditsBody: FC<any> = () => {
  const { data } = api.credits.getAll.useQuery();

  const HeaderTable = () => {
    const HEADER_TITLE: string[] = [
      "payment date",
      "description",
      "amount",
      "account",
      "total",
      "leftParts",
    ];
    return HEADER_TITLE.map((item, i) => (
      <div
        key={i}
        className="flex h-12 w-full flex-row items-center justify-center gap-2 border-x-0 border-b border-t-0 border-solid border-[#f0f1f3] bg-[#f9f9fc]"
      >
        <Typography className="w-[149px] text-center text-sm font-medium capitalize leading-[20px] tracking-[0.07] ">
          {item}
        </Typography>
        <img
          src="https://file.rendit.io/n/yoRd5tIkseA7Q9Ht8wC8.svg"
          className="min-h-0 w-4 min-w-0 shrink-0"
        />
      </div>
    ));
  };

  const BodyTable = ({ data }: { data: Credit[] | undefined }) => {
    if (!data) return null;

    const parsedData: ParsedData[] = data.map((item) => {
      return {
        id: item.id,
        paymentDate: new Date(item.paymentDate),
        description: item.description,
        amount: item.amount,
        account: item.account,
        leftParts: item.leftParts,
        total: item.amount * item.leftParts,
      };
    });

    return parsedData.map((item, i) => {
      const keys = Object.keys(item);

      const rowValues: any = [];

      keys.forEach((key, i) => {
        if (key === "id") return;
        const value = (item as any)[key];
        rowValues.push(
          <div
            key={i}
            className="flex h-20 w-full flex-row items-center justify-center gap-2 border-x-0 border-b border-t-0 border-solid border-[#f0f1f3] bg-white"
          >
            <img
              src="https://file.rendit.io/n/XWF3M3mC116v8h5eJl3Q.png"
              className="min-h-0 w-10 min-w-0 shrink-0"
            />
            <div className="flex w-1/2 flex-col gap-1">
              <Typography className="whitespace-nowrap  text-sm font-medium leading-[20px] tracking-[0.07] ">
                {value}
              </Typography>
            </div>
          </div>
        );
      });

      return rowValues;
    });
  };

  return (
    <div className="flex w-auto flex-row items-center overflow-auto">
      <HeaderTable />
      <Suspense>
        <BodyTable data={data} />
      </Suspense>
    </div>
  );
};

const Credits: FC<any> = () => {
  const { data: session } = useSession();
  const { mutate } = api.credits.create.useMutation();

  const [openModal, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    console.log(formElement);
    if (session?.user.id) {
      const data = {
        paymentDate: formElement.paymentDate.value,
        description: formElement.description.value,
        amount: formElement.amount.value,
        account: formElement.account.value,
        leftParts: formElement.leftParts.value,
        userId: session.user.id,
      };

      mutate({ ...data });
    }

    handleClose();
  };

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
          <CreditsBody />
        </CardBody>
      </Card>
    </div>
  );
};
export default Credits;
