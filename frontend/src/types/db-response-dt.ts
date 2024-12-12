export interface IDBResponseDT<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  }


  export type ISQLUpdateResponse = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus:number;
    warningStatus: number;
    changedRows: number;
  }