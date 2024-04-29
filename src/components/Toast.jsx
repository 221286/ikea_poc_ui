import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
Add the <Toaster/> component to the parent - Added in the layout.jsx
Use the Toaster to config the toast with the type, message, and options
e.g Toaster({type: 'success', message: 'Test message!', options: {}})
*/

/**
 * Toast Component
 * @param {string} type - The type of the toast (e.g., success, error, warning).
 * @param {string} message - The message to be displayed in the toast.
 * @param {Object} options - Additional options to customize the toast (optional).
 */

const Toast = ({ type, message, options }) => {
  const defaultToastOptions = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 60,
  };

  const toastOptions = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "promise":
      toast.promise(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }

  return <ToastContainer />;
};

export default Toast;
