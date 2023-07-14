import { Avatar, Typography } from '@material-tailwind/react'
import React from 'react'
import CustomSelect from '~/components/CustomSelect'



export default function SelectEditableRow({ index, isEditable, title, classes, className, value, img, handleFieldChange }: EditableRow) {

  return (
      <td className={classes}>
        {isEditable ? (
            <CustomSelect
            className={className}
            title={"status"}
            options={["PAID", "PENDING", "CANCELED"]}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold"
            >
              {value}
            </Typography>
          </div>
        )}
      </td>
  )
}
