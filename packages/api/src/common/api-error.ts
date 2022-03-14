export interface IApiError {
  code: string; // MODULE:NUMBER
  message: string;
}

export interface IApiErrorResponse {
  statusCode: number;
  errors: IApiError[];
}

export function createApiErrorResponse(status: number, errors?: IApiError[]) {
  return {
    statusCode: status,
    errors
  }
}
