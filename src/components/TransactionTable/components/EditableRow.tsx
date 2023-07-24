import { Typography } from "@material-tailwind/react";
import React from "react";

export default function EditableRow({
  index,
  isEditable,
  title,
  classes,
  value,
  handleFieldChange,
}: any) {
  return (
    <td className={classes}>
      {isEditable ? (
        <input
          className="m-0 flex  w-28 items-center"
          type={title === "date" ? "date" : "text"}
          value={value}
          onChange={(event) => {
            if (event.target.value !== undefined) {
              handleFieldChange(index, title, event.target.value);
            }
          }}
        />
      ) : (
        <div className="flex-row items-center gap-1 text-center">
          <Typography
            variant="small"
            color="blue-gray"
            className="text-center font-bold"
          >
            {value}
          </Typography>
        </div>
      )}
    </td>
  );
}
