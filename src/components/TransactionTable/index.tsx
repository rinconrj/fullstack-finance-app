import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { FormEvent, use, useEffect, useState } from "react";
import { Modal } from "@mui/base";
import { Box } from "@mui/material";
import CustomSelect from "../CustomSelect";
import Row from "./components/EditableRow";
import RowSelect from "./components/SelectEditableRow";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { TableRow } from "~/types/types";

const TABLE_HEAD = [
  "Description",
  "Amount",
  "Date",
  "Category",
  "Type",
  "Account",
];

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddRowModal: React.FC<{
  open: boolean;
  onClose: () => void;
  handelSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}> = ({ open, onClose, handelSubmit }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          className="max-w-screen-lg mb-2 mt-8 w-80"
          onSubmit={handelSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <input
              type="text"
              name="description"
              className="input"
              placeholder="description"
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
              title={"category"}
              options={["service", "food", "spend"]}
            />
            <CustomSelect title={"type"} options={["income", "outcome"]} />
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
  const { data: session } = useSession();
  const mutation = api.transaction.create.useMutation();
  const deleteRow = api.transaction.delete.useMutation();
  const data = api.transaction.getAll.useQuery();
  const [openModal, setOpenModal] = useState(false);
  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [tableRows, setTableRows] = useState(data.data);

  useEffect(() => {
    if (data.data) {
      setTableRows(data.data);
    }
  }, [data.data]);

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
    const updatedRows: any = new Array(tableRows);

    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };

    setTableRows(updatedRows);
  };

  const handleAddRow = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      description: event.currentTarget.description.value,
      amount: event.currentTarget.amount.value,
      date: event.currentTarget.date.value,
      category: event.currentTarget.category.value,
      account: event.currentTarget.account.value,
      userId: session?.user?.id,
    } as any);

    handleCloseModal();
  };

  const removeColumn = (index: number) => {
    const updatedRows: any = new Array(tableRows);
    const { id } = updatedRows[index];
    if (id) {
      deleteRow.mutate(id);

      if (deleteRow.isSuccess) {
        updatedRows.splice(index, 1);

        setTableRows(updatedRows);
      }
    }
  };

  return (
    <>
      <Card className="h-full w-full">
        <AddRowModal
          open={openModal}
          onClose={handleCloseModal}
          handelSubmit={handleSubmit}
        />
        <CardBody className="overflow-hidden px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center"
                  >
                    <Typography>{head}</Typography>
                  </th>
                ))}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
            <tbody className="ml-3">
              {tableRows?.map(
                (
                  { description, amount, date, category, account, type }: any,
                  index
                ) => {
                  const isEditable = index === editableRowIndex;
                  const classes =
                    "p-1 border-b border-blue-gray-50 w-fit text-center";

                  return (
                    <tr key={index}>
                      <Row
                        isEditable={isEditable}
                        classes={classes}
                        title={"description"}
                        value={description}
                        index={index}
                        handleFieldChange={handleFieldChange}
                      />
                      <Row
                        isEditable={isEditable}
                        classes={classes}
                        title={"amount"}
                        value={amount}
                        index={index}
                        handleFieldChange={handleFieldChange}
                      />
                      <Row
                        isEditable={isEditable}
                        classes={classes}
                        title={"date"}
                        value={date}
                        index={index}
                        handleFieldChange={handleFieldChange}
                      />
                      <RowSelect
                        isEditable={isEditable}
                        classes={classes}
                        className={"w-fit"}
                        title={"category"}
                        value={category}
                        index={index}
                        options={["service", "food", "spend"]}
                        handleFieldChange={handleFieldChange}
                      />
                      <RowSelect
                        isEditable={isEditable}
                        classes={classes}
                        className={"w-fit"}
                        title={"type"}
                        value={type}
                        index={index}
                        options={["service", "food", "spend"]}
                        handleFieldChange={handleFieldChange}
                      />
                      <Row
                        isEditable={isEditable}
                        classes={classes}
                        title={"account"}
                        value={account}
                        index={index}
                        handleFieldChange={handleFieldChange}
                      />
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
                      <td className={classes}>
                        <TrashIcon
                          className="h-4 w-4"
                          onClick={() => removeColumn(index)}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionTable;
