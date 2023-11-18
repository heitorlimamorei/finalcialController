import { firebaseTimesStampType } from "../utils/dateMethods";

export interface SheetContextProps {
  sheet: FinalSheetProps;
  createNewSheet: (payload: NewSheetProps) => Promise<void>;
  refreshSheet: () => void;
  onChangeUser: (newUser: string) => void;
  dispacht: any;
  refreshItems: () => Promise<void>;
  loadSheet: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  createNewItem: (newItem: newSheetItemProps) => Promise<void>;
  sumAllItems: () => number;
  getBalance: () => number;
  getSortedItems: (sortType: shortingTypes) => sheetItemProps[];
  updateItem: (item: sheetItemProps) => Promise<void>;
  filterByName: (name: string, currentItems?: sheetItemProps[]) => sheetItemProps[];
  filterByDescription: (description: string, currentItems?: sheetItemProps[]) => sheetItemProps[];
  createUser: (newUser: NewUserProps) => Promise<void>;
  updateUser: (user: userProps) => Promise<void>;
  deleteUser: (user: userProps) => Promise<void>;
  filterBySpentType: (spentType: string, currentItems?: sheetItemProps[]) => sheetItemProps[];
  getStats: () => {
    name: string;
    value: number;
    length: number;
  }[];
}
export interface sheetProps {
  data: {
    id: string;
    owner: string;
    type: string;
    tiposDeGastos: string[];
    totalValue: number;
    name: string;
  };
  session: {
    authenticated: boolean;
    role: string;
    canView: boolean;
    canDelete: boolean;
    canEditItems: boolean;
    canEditUsers: boolean;
    canManageSheetProps: boolean;
  };
}
interface returnedSheetAfterUpdate {
  id: string;
  owner: string;
  type: string;
  tiposDeGastos: string[];
  totalValue: number;
  name: string;
}
export interface upadatedSheetProps {
  tiposDeGastos: string[];
  totalValue: number;
  name: string;
}
export interface userProps {
  id: string;
  role: string;
  email: string;
}
export interface NewUserProps {
  role: string;
  email: string;
}
export interface FinalSheetProps {
  data: {
    id: string;
    owner: string;
    type: string;
    tiposDeGastos: string[];
    totalValue: number;
    name: string;
  };
  session: {
    authenticated: boolean;
    role: string;
    canView: boolean;
    canDelete: boolean;
    canEditItems: boolean;
    canEditUsers: boolean;
    canManageSheetProps: boolean;
  };
  users: userProps[];
  items: sheetItemProps[];
  currentUser: string;
}
export interface sheetItemProps {
  id: string;
  value: number;
  author: string;
  type: string;
  sheetId: string;
  date: any;
  description: string;
  name: string;
}
export interface newSheetItemProps {
  value: number;
  author: string;
  type: string;
  sheetId: string;
  date: any;
  description: string;
  name: string;
}
export interface NewSheetProps {
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
  name: string;
}
export type sheetAction =
  | {
      type: 'create';
      payload: {
        sheet: sheetProps;
        items: sheetItemProps[];
        users: userProps[];
      };
    }
  | {
      type: 'refresh';
      payload: {
        sheet: sheetProps;
        items: sheetItemProps[];
        users: userProps[];
      };
    }
  | {
      type: 'onUpdate';
      payload: returnedSheetAfterUpdate;
    }
  | { type: 'onChangeUser'; payload: string }
  | { type: 'refreshItems'; payload: sheetItemProps[] }
  | { type: 'refreshUsers'; payload: userProps[] }
  | { type: 'onDeleteSheet' };
export type shortingTypes = 'ascending' | 'descending' | 'date ascending' | 'date descending';
export interface itemRenderOptions {
  name: string;
  type: string;
  description: string;
  sortMode: shortingTypes;
}
export interface itemFormDataProps {
  id?: string;
  name: string;
  type: string;
  value: number;
  description: string;
}
export interface sheetFormDataProps {
  id?: string;
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
  name: string;
}
export interface iFormError {
  errorCode: string;
  message: string;
}

type JsonDate = string;

export interface IOkrProps {
  id: string;
  sheetId: string;
  start_cycle: JsonDate;
  end_cycle: JsonDate;
  createdAt: JsonDate;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

export interface newOkrProps {
  sheetId: string;
  start_cycle: Date;
  end_cycle: Date;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

export interface newOkrJsonProps {
  sheetId: string;
  start_cycle: JsonDate;
  end_cycle: JsonDate;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

export interface IOkrFrontProps {
  id: string;
  sheetId: string;
  start_cycle: Date;
  end_cycle: Date;
  createdAt: Date;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}