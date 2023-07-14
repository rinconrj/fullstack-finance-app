import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Select,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";
import { Modal } from "@mui/base";
import { Box } from "@mui/material";
import CustomSelect from "../CustomSelect";
import Row from "./components/EditableRow";
import RowSelect from "./components/SelectEditableRow";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account"];

const TABLE_ROWS: TableRow[] = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const AddRowModal: React.FC<{ open: boolean; onClose: () => void}> = ({
  open,
  onClose
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Retrieve the form values and perform necessary processing
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <input
              type="text"
              name="transaction"
              className="input"
              placeholder="transaction"
            />
            <input
              type="text"
              name="amount"
              className="input"
              placeholder="amount"
            />
            <input
              type="date"
              name="date"
              className="input"
              placeholder="date"
            />
            <CustomSelect
              title={"status"}
              options={["PAID", "PENDING", "CANCELED"]}
            />
            <input
              type="select"
              name="account"
              className="input"
              placeholder="account"
            />
          </div>
          <Button type="submit" fullWidth>
            save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const TransactionTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [tableRows, setTableRows] = useState(TABLE_ROWS);

  const handleOpenModal = (index: number) => {
    setEditableRowIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditableRowIndex(-1);
    setOpenModal(false);
  };

  const handleFieldChange = (
    index: number,
    field: keyof TableRow,
    value: string
  ) => {
    const updatedRows = [...tableRows];

    updatedRows[index][field] = value;

    setTableRows(updatedRows);
  };

  const handleAddRow = () => {
    setOpenModal(true);
  };


  return (
    <>
    <Card className="h-full w-full overflow-hidden">
      <AddRowModal open={openModal} onClose={handleCloseModal} />

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* ... (rest of the code) */}
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  {head}
                </th>
              ))}
              <th
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
              <Button
                color="blue"
                size="sm"
                onClick={handleAddRow}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(
            (
              { img, name, amount, date, status, account, accountNumber, expiry },
              index
            ) => {
              const isEditable = index === editableRowIndex;
              const isLast = index === tableRows.length - 1;
              const classes =  "p-1 border-b border-blue-gray-50 w-fit";

              return (
                <tr key={index}>
                  <Row isEditable={isEditable} classes={classes} title={'name'} value={name} img={img} index={index} handleFieldChange={handleFieldChange} />
                  <Row isEditable={isEditable} classes={classes} title={'amount'} value={amount} img={img} index={index} handleFieldChange={handleFieldChange} />
                  <Row isEditable={isEditable} classes={classes} title={'date'} value={date} img={img} index={index} handleFieldChange={handleFieldChange} />
                  <RowSelect isEditable={isEditable} classes={classes} className={"w-fit"} title={'status'} value={status} img={img} index={index} handleFieldChange={handleFieldChange} />
                  <Row isEditable={isEditable} classes={classes} title={'account'} value={account} img={img} index={index} handleFieldChange={handleFieldChange} />
                  <td className={classes}>
                    {isEditable ? (

                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleCloseModal()}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </IconButton>

                    ) : (

                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => setEditableRowIndex(index)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>

                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </CardBody>
    </Card >
    </>
  );
};

export default TransactionTable;