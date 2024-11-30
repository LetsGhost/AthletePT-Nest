export interface ServiceResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}
