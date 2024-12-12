export interface IErrorMessage {
  path: string;
  message: string;
}

export interface IErrorResponse {
  data: {
    success: boolean;
    message: string;
    errorMessages: IErrorMessage[];
  };
}
