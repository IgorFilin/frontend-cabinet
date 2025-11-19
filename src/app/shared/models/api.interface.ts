export interface IApiResponse<T = unknown> {
  success: boolean;
  data?: T;
}
