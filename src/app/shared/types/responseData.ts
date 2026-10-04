export type ResponseData<T> = {
  data: T;
  message: string;
  status: number;
};