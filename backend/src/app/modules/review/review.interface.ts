import { RowDataPacket } from 'mysql2'

export type CountResult = {
  count: number
} & RowDataPacket;
