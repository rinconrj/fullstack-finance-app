interface EditableRow {
  index: number
  isEditable: boolean
  classes: string
  value: string | number
  title: keyof TableRow
  img?: string
  className?: string
  handleFieldChange: ((index: number, field: keyof TableRow, value: string) => void)
}

interface TableRow {
  id: string;
  userId: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: string;
  account: string;
}

interface SelectChangeEvent {
  target: {
    name?: string;
    value: any;
  };
}


export interface DefaultUser {
  id: string
  name?: string | null
  email?: string | null
}

export interface UserSession extends Session {
  user: User;
}