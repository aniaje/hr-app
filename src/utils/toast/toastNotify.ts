import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = () =>
  toast.success("Success!", {
    position: toast.POSITION.TOP_CENTER,
  });

export const notifyError = () =>
  toast.error("Oops, something went wrong, let's try again...", {
    position: toast.POSITION.TOP_CENTER,
  });

export const notifySignupSuccess = () =>
  toast.success("You're registered! Let's login...", {
    position: toast.POSITION.TOP_CENTER,
  });
