import { toast } from "react-toastify";

const TOAST_DURATION = 3000;

export const showErrorToast = (message: string) => {
  toast.error(message, {
    autoClose: TOAST_DURATION,
  });
};
