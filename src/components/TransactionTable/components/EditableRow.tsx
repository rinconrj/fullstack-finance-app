import { Avatar, Typography } from '@material-tailwind/react'
import React from 'react'



export default function EditableRow({ index, isEditable, title, classes, value, img, handleFieldChange }: EditableRow) {
  return (
      <td className={classes}>
        {isEditable ? (
          <input
            className="flex items-center  w-28 m-0"
            type={title ==="date" ? "date": "text"}
            value={value}
            onChange={(event) =>{
              if (event.target.value !== undefined){
              handleFieldChange(index, title , event.target.value)
            }}
            }
          />
        ) : (
          <div className="flex items-center gap-1">

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
