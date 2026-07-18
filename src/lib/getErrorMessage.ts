import axios from "axios";

type ApiErrorResponse = {
  success: false;
  message: string | null;
  data: null;
  errors: { field: string; message: string }[] | null;
};

export function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

export function getFieldError(error: unknown, field: string) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.errors?.find((e) => e.field === field)
      ?.message;
  }
  return undefined;
}
