interface EditableRow {
  index: number
   isEditable: boolean
   classes: string
   value: string
   title: keyof TableRow
   img?: string
   className?: string
   handleFieldChange: ((index: number, field: keyof TableRow, value: string) => void
}

interface TableRow {
  img: string;
  name: string;
  amount: string;
  date: string;
  status: string;
  account: string;
  accountNumber: string;
  expiry: string;
}
