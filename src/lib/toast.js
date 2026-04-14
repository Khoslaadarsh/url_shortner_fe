import { Slide, toast } from "react-toastify";

const config = () => ({
  position: window.innerWidth < 768 ? "top-center" : "top-right",
  autoClose: 3000,
  closeButton: true,
  pauseOnHover: false,
  transition: Slide,
});

export const showToast = {
  success: (msg) => toast.success(msg, config()),
  error: (msg) => toast.error(msg, config()),
};
